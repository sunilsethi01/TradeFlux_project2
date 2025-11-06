const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const { UserModel } = require('../model/UserModel');
const { HoldingsModel } = require('../model/HoldingsModel');
const { OrdersModel } = require('../model/OrdersModel');
const { PositionsModel } = require('../model/PositionsModel');
const router = express.Router();

// Finnhub API configuration
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'your_finnhub_api_key_here';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Mock prices for Indian stocks (Finnhub doesn't support NSE/BSE)
const MOCK_PRICES = {
    'INFY': 1555.45,
    'TCS': 3194.80,
    'RELIANCE': 2524.10,
    'HDFCBANK': 1522.35,
    'BHARTIARTL': 541.15,
    'HINDUNILVR': 2417.40,
    'WIPRO': 577.75,
    'M&M': 779.80,
    'QUICKHEAL': 326.55,
    'KPITTECH': 266.25,
    'ONGC': 198.80
};

// Helper function to get current stock price
async function getCurrentPrice(symbol) {
    try {
        const symbolUpper = symbol.toUpperCase();
        
        // Check if it's an Indian stock (use mock price)
        if (MOCK_PRICES[symbolUpper]) {
            // Add random fluctuation (±2%) to simulate real-time price
            const basePrice = MOCK_PRICES[symbolUpper];
            const fluctuation = (Math.random() - 0.5) * 0.04; // ±2%
            return basePrice * (1 + fluctuation);
        }
        
        // For US stocks, use Finnhub API
        const response = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
            params: {
                symbol: symbolUpper,
                token: FINNHUB_API_KEY
            }
        });
        
        if (response.data.c === 0 || !response.data.c) {
            // Fallback to mock price if API returns 0
            return MOCK_PRICES[symbolUpper] || 100;
        }
        
        return response.data.c; // Current price
    } catch (err) {
        console.error(`Error fetching price for ${symbol}:`, err.message);
        // Return mock price as fallback
        return MOCK_PRICES[symbol.toUpperCase()] || 100;
    }
}

// Helper function to get company profile
async function getCompanyProfile(symbol) {
    try {
        const response = await axios.get(`${FINNHUB_BASE_URL}/stock/profile2`, {
            params: {
                symbol: symbol.toUpperCase(),
                token: FINNHUB_API_KEY
            }
        });
        return response.data;
    } catch (err) {
        return { name: symbol };
    }
}

// BUY stock
router.post('/buy', auth, async (req, res) => {
    try {
        const { symbol, qty, orderType = 'MARKET', limitPrice } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!symbol || !qty || qty <= 0) {
            return res.status(400).json({ msg: 'Invalid symbol or quantity' });
        }

        // Get current stock price
        const currentPrice = orderType === 'MARKET' 
            ? await getCurrentPrice(symbol)
            : limitPrice;

        if (!currentPrice || currentPrice <= 0) {
            return res.status(400).json({ msg: 'Invalid stock price' });
        }

        const totalCost = currentPrice * qty;

        // Get user and check balance
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.balance < totalCost) {
            return res.status(400).json({ 
                msg: 'Insufficient balance',
                required: totalCost,
                available: user.balance
            });
        }

        // Get company name
        const companyProfile = await getCompanyProfile(symbol);
        const companyName = companyProfile.name || symbol;

        // Deduct balance
        user.balance -= totalCost;
        await user.save();

        // Create order record
        const order = new OrdersModel({
            userId,
            symbol: symbol.toUpperCase(),
            name: companyName,
            qty,
            price: currentPrice,
            mode: 'BUY',
            orderType,
            status: 'COMPLETED'
        });
        await order.save();

        // Update or create holding
        let holding = await HoldingsModel.findOne({ 
            userId, 
            symbol: symbol.toUpperCase() 
        });

        if (holding) {
            // Update existing holding - calculate new average price
            const totalQty = holding.qty + qty;
            const totalValue = (holding.avg * holding.qty) + (currentPrice * qty);
            holding.avg = totalValue / totalQty;
            holding.qty = totalQty;
            holding.price = currentPrice;
            holding.updatedAt = Date.now();
        } else {
            // Create new holding
            holding = new HoldingsModel({
                userId,
                symbol: symbol.toUpperCase(),
                name: companyName,
                qty,
                avg: currentPrice,
                price: currentPrice
            });
        }
        await holding.save();

        res.json({
            msg: 'Stock purchased successfully',
            order: {
                symbol: symbol.toUpperCase(),
                qty,
                price: currentPrice,
                total: totalCost
            },
            balance: user.balance
        });
    } catch (err) {
        console.error('Buy Error:', err.message);
        res.status(500).json({ msg: 'Error processing buy order', error: err.message });
    }
});

// SELL stock
router.post('/sell', auth, async (req, res) => {
    try {
        const { symbol, qty, orderType = 'MARKET', limitPrice } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!symbol || !qty || qty <= 0) {
            return res.status(400).json({ msg: 'Invalid symbol or quantity' });
        }

        // Check if user has the holding
        const holding = await HoldingsModel.findOne({ 
            userId, 
            symbol: symbol.toUpperCase() 
        });

        if (!holding) {
            return res.status(404).json({ msg: 'You do not own this stock' });
        }

        if (holding.qty < qty) {
            return res.status(400).json({ 
                msg: 'Insufficient quantity',
                available: holding.qty,
                requested: qty
            });
        }

        // Get current stock price
        const currentPrice = orderType === 'MARKET' 
            ? await getCurrentPrice(symbol)
            : limitPrice;

        if (!currentPrice || currentPrice <= 0) {
            return res.status(400).json({ msg: 'Invalid stock price' });
        }

        const totalRevenue = currentPrice * qty;

        // Get user and update balance
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.balance += totalRevenue;
        await user.save();

        // Create order record
        const order = new OrdersModel({
            userId,
            symbol: symbol.toUpperCase(),
            name: holding.name,
            qty,
            price: currentPrice,
            mode: 'SELL',
            orderType,
            status: 'COMPLETED'
        });
        await order.save();

        // Update holding
        holding.qty -= qty;
        holding.price = currentPrice;
        holding.updatedAt = Date.now();

        if (holding.qty === 0) {
            // Remove holding if quantity is 0
            await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
            await holding.save();
        }

        res.json({
            msg: 'Stock sold successfully',
            order: {
                symbol: symbol.toUpperCase(),
                qty,
                price: currentPrice,
                total: totalRevenue,
                profit: (currentPrice - holding.avg) * qty
            },
            balance: user.balance
        });
    } catch (err) {
        console.error('Sell Error:', err.message);
        res.status(500).json({ msg: 'Error processing sell order', error: err.message });
    }
});

// Get user's holdings
router.get('/holdings', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const holdings = await HoldingsModel.find({ userId });

        // Fetch current prices for all holdings
        const holdingsWithCurrentPrice = await Promise.all(
            holdings.map(async (holding) => {
                try {
                    const currentPrice = await getCurrentPrice(holding.symbol);
                    const totalValue = currentPrice * holding.qty;
                    const totalCost = holding.avg * holding.qty;
                    const profitLoss = totalValue - totalCost;
                    const profitLossPercent = ((profitLoss / totalCost) * 100).toFixed(2);

                    return {
                        ...holding.toObject(),
                        price: currentPrice,
                        net: `${profitLossPercent}%`,
                        profitLoss,
                        totalValue,
                        totalCost
                    };
                } catch (err) {
                    return {
                        ...holding.toObject(),
                        error: 'Unable to fetch current price'
                    };
                }
            })
        );

        res.json(holdingsWithCurrentPrice);
    } catch (err) {
        console.error('Holdings Error:', err.message);
        res.status(500).json({ msg: 'Error fetching holdings', error: err.message });
    }
});

// Get user's orders
router.get('/orders', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await OrdersModel.find({ userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error('Orders Error:', err.message);
        res.status(500).json({ msg: 'Error fetching orders', error: err.message });
    }
});

// Get user's positions
router.get('/positions', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const positions = await PositionsModel.find({ userId });
        res.json(positions);
    } catch (err) {
        console.error('Positions Error:', err.message);
        res.status(500).json({ msg: 'Error fetching positions', error: err.message });
    }
});

// Get user's portfolio summary
router.get('/portfolio', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await UserModel.findById(userId).select('-password');
        const holdings = await HoldingsModel.find({ userId });
        
        let totalInvested = 0;
        let currentValue = 0;

        // Calculate portfolio value
        for (const holding of holdings) {
            try {
                const currentPrice = await getCurrentPrice(holding.symbol);
                totalInvested += holding.avg * holding.qty;
                currentValue += currentPrice * holding.qty;
            } catch (err) {
                console.error(`Error fetching price for ${holding.symbol}`);
            }
        }

        const profitLoss = currentValue - totalInvested;
        const profitLossPercent = totalInvested > 0 
            ? ((profitLoss / totalInvested) * 100).toFixed(2)
            : 0;

        res.json({
            balance: user.balance,
            totalInvested,
            currentValue,
            profitLoss,
            profitLossPercent: `${profitLossPercent}%`,
            totalPortfolioValue: user.balance + currentValue,
            holdingsCount: holdings.length
        });
    } catch (err) {
        console.error('Portfolio Error:', err.message);
        res.status(500).json({ msg: 'Error fetching portfolio', error: err.message });
    }
});

module.exports = router;
