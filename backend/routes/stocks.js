const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
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

// Get real-time stock quote
router.get('/quote/:symbol', auth, async (req, res) => {
    try {
        const { symbol } = req.params;
        const symbolUpper = symbol.toUpperCase();
        
        // Check if it's an Indian stock (use mock price)
        if (MOCK_PRICES[symbolUpper]) {
            const basePrice = MOCK_PRICES[symbolUpper];
            const fluctuation = (Math.random() - 0.5) * 0.04; // ±2%
            const currentPrice = basePrice * (1 + fluctuation);
            const prevClose = basePrice * (1 + (Math.random() - 0.5) * 0.03);
            const change = currentPrice - prevClose;
            const percentChange = (change / prevClose) * 100;
            
            return res.json({
                symbol: symbolUpper,
                currentPrice: Number(currentPrice.toFixed(2)),
                change: Number(change.toFixed(2)),
                percentChange: Number(percentChange.toFixed(2)),
                high: Number((currentPrice * 1.02).toFixed(2)),
                low: Number((currentPrice * 0.98).toFixed(2)),
                open: Number(prevClose.toFixed(2)),
                previousClose: Number(prevClose.toFixed(2)),
                timestamp: Math.floor(Date.now() / 1000)
            });
        }
        
        // For US stocks, use Finnhub API
        const response = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
            params: {
                symbol: symbolUpper,
                token: FINNHUB_API_KEY
            }
        });

        if (response.data.c === 0 || !response.data.c) {
            // Fallback to mock price
            const mockPrice = MOCK_PRICES[symbolUpper] || 100;
            return res.json({
                symbol: symbolUpper,
                currentPrice: mockPrice,
                change: 0,
                percentChange: 0,
                high: mockPrice * 1.02,
                low: mockPrice * 0.98,
                open: mockPrice,
                previousClose: mockPrice,
                timestamp: Math.floor(Date.now() / 1000)
            });
        }

        res.json({
            symbol: symbolUpper,
            currentPrice: response.data.c,
            change: response.data.d,
            percentChange: response.data.dp,
            high: response.data.h,
            low: response.data.l,
            open: response.data.o,
            previousClose: response.data.pc,
            timestamp: response.data.t
        });
    } catch (err) {
        console.error('Stock Quote Error:', err.message);
        // Return mock price as final fallback
        const symbolUpper = req.params.symbol.toUpperCase();
        const mockPrice = MOCK_PRICES[symbolUpper] || 100;
        res.json({
            symbol: symbolUpper,
            currentPrice: mockPrice,
            change: 0,
            percentChange: 0,
            high: mockPrice * 1.02,
            low: mockPrice * 0.98,
            open: mockPrice,
            previousClose: mockPrice,
            timestamp: Math.floor(Date.now() / 1000)
        });
    }
});

// Search for stocks
router.get('/search/:query', auth, async (req, res) => {
    try {
        const { query } = req.params;
        
        const response = await axios.get(`${FINNHUB_BASE_URL}/search`, {
            params: {
                q: query,
                token: FINNHUB_API_KEY
            }
        });

        res.json({
            count: response.data.count,
            results: response.data.result.slice(0, 10) // Limit to top 10 results
        });
    } catch (err) {
        console.error('Finnhub API Error:', err.message);
        res.status(500).json({ msg: 'Error searching stocks', error: err.message });
    }
});

// Get company profile
router.get('/profile/:symbol', auth, async (req, res) => {
    try {
        const { symbol } = req.params;
        
        const response = await axios.get(`${FINNHUB_BASE_URL}/stock/profile2`, {
            params: {
                symbol: symbol.toUpperCase(),
                token: FINNHUB_API_KEY
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error('Finnhub API Error:', err.message);
        res.status(500).json({ msg: 'Error fetching company profile', error: err.message });
    }
});

// Get multiple stock quotes at once
router.post('/quotes', auth, async (req, res) => {
    try {
        const { symbols } = req.body; // Array of symbols
        
        if (!Array.isArray(symbols) || symbols.length === 0) {
            return res.status(400).json({ msg: 'Please provide an array of stock symbols' });
        }

        const promises = symbols.map(symbol => 
            axios.get(`${FINNHUB_BASE_URL}/quote`, {
                params: {
                    symbol: symbol.toUpperCase(),
                    token: FINNHUB_API_KEY
                }
            }).catch(err => ({ error: true, symbol, message: err.message }))
        );

        const results = await Promise.all(promises);
        
        const quotes = results.map((result, index) => {
            if (result.error) {
                return { symbol: symbols[index], error: result.message };
            }
            return {
                symbol: symbols[index].toUpperCase(),
                currentPrice: result.data.c,
                change: result.data.d,
                percentChange: result.data.dp,
                high: result.data.h,
                low: result.data.l,
                open: result.data.o,
                previousClose: result.data.pc
            };
        });

        res.json({ quotes });
    } catch (err) {
        console.error('Error fetching multiple quotes:', err.message);
        res.status(500).json({ msg: 'Error fetching stock quotes', error: err.message });
    }
});

// Get market news
router.get('/news', auth, async (req, res) => {
    try {
        const response = await axios.get(`${FINNHUB_BASE_URL}/news`, {
            params: {
                category: 'general',
                token: FINNHUB_API_KEY
            }
        });

        res.json(response.data.slice(0, 20)); // Limit to 20 news items
    } catch (err) {
        console.error('Finnhub API Error:', err.message);
        res.status(500).json({ msg: 'Error fetching market news', error: err.message });
    }
});

// Get company news for specific symbol
router.get('/news/:symbol', auth, async (req, res) => {
    try {
        const { symbol } = req.params;
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const response = await axios.get(`${FINNHUB_BASE_URL}/company-news`, {
            params: {
                symbol: symbol.toUpperCase(),
                from: lastWeek.toISOString().split('T')[0],
                to: today.toISOString().split('T')[0],
                token: FINNHUB_API_KEY
            }
        });

        res.json(response.data.slice(0, 10)); // Limit to 10 news items
    } catch (err) {
        console.error('Finnhub API Error:', err.message);
        res.status(500).json({ msg: 'Error fetching company news', error: err.message });
    }
});

module.exports = router;
