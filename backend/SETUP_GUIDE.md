# TradeFlux Setup Guide

## Quick Start

### 1. Get Finnhub API Key (FREE)

1. Go to [https://finnhub.io/register](https://finnhub.io/register)
2. Sign up with your email
3. Verify your email
4. Go to Dashboard and copy your API Key
5. Free tier includes:
   - 60 API calls/minute
   - Real-time stock quotes
   - Company profiles
   - Market news

### 2. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URL=mongodb://localhost:27017/tradeflux
JWT_SECRET=your_super_secret_jwt_key_change_this
FINNHUB_API_KEY=paste_your_finnhub_api_key_here
PORT=4000
```

**Important:** Replace `paste_your_finnhub_api_key_here` with your actual Finnhub API key!

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Server

```bash
npm start
```

You should see:
```
App started
DB connected
```

---

## Testing the API

### Option 1: Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Import the requests below

### Option 2: Using Postman

1. Download Postman
2. Create a new collection
3. Add the requests below

### Option 3: Using cURL

Test directly from terminal with the commands below.

---

## Test Requests

### 1. Sign Up

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

**Save the token from the response!**

### 2. Get Stock Quote (Replace YOUR_TOKEN)

```bash
curl -X GET http://localhost:4000/api/stocks/quote/AAPL \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Buy Stock

```bash
curl -X POST http://localhost:4000/api/trades/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "AAPL",
    "qty": 10
  }'
```

### 4. Check Holdings

```bash
curl -X GET http://localhost:4000/api/trades/holdings \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Check Portfolio

```bash
curl -X GET http://localhost:4000/api/trades/portfolio \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Sell Stock

```bash
curl -X POST http://localhost:4000/api/trades/sell \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "AAPL",
    "qty": 5
  }'
```

---

## Popular Stock Symbols to Test

- **AAPL** - Apple Inc.
- **TSLA** - Tesla Inc.
- **GOOGL** - Alphabet Inc. (Google)
- **MSFT** - Microsoft Corporation
- **AMZN** - Amazon.com Inc.
- **META** - Meta Platforms Inc. (Facebook)
- **NVDA** - NVIDIA Corporation
- **AMD** - Advanced Micro Devices
- **NFLX** - Netflix Inc.
- **DIS** - The Walt Disney Company

---

## Features Implemented

### ✅ Authentication
- User signup with JWT token
- User login
- Protected routes with authentication middleware
- Each user starts with $100,000 virtual balance

### ✅ Live Stock Data (Finnhub API)
- Real-time stock quotes
- Stock search
- Company profiles
- Market news
- Company-specific news
- Multiple quotes at once

### ✅ Trading Features
- **Buy stocks** - Purchase stocks at current market price
- **Sell stocks** - Sell owned stocks
- **Holdings** - View all owned stocks with live prices
- **Orders** - View transaction history
- **Portfolio** - View complete portfolio summary with P&L

### ✅ Smart Features
- Automatic average price calculation when buying same stock multiple times
- Real-time profit/loss calculation
- Balance validation before buying
- Quantity validation before selling
- User-specific data isolation
- Automatic holding removal when quantity reaches 0

---

## Database Schema Updates

All schemas now include `userId` to link data to specific users:

- **UserSchema** - Added `balance` field (default: 100000)
- **HoldingsSchema** - Added `userId`, `symbol`, timestamps
- **OrdersSchema** - Added `userId`, `symbol`, `orderType`, `status`
- **PositionsSchema** - Added `userId`, `symbol`, timestamps

---

## API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /signup` - Create new user
- `POST /login` - Login user
- `GET /check-auth` - Check auth status
- `POST /logout` - Logout user

### Stocks (`/api/stocks`) - All require auth
- `GET /quote/:symbol` - Get stock quote
- `GET /search/:query` - Search stocks
- `GET /profile/:symbol` - Get company profile
- `POST /quotes` - Get multiple quotes
- `GET /news` - Get market news
- `GET /news/:symbol` - Get company news

### Trades (`/api/trades`) - All require auth
- `POST /buy` - Buy stock
- `POST /sell` - Sell stock
- `GET /holdings` - Get user holdings
- `GET /orders` - Get user orders
- `GET /positions` - Get user positions
- `GET /portfolio` - Get portfolio summary

---

## Troubleshooting

### Error: "No token, authorization denied"
- Make sure you're including the token in the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`

### Error: "Invalid stock symbol"
- Check if the symbol is correct (use uppercase)
- Verify Finnhub API key is valid
- Check if you've exceeded rate limits (60 calls/minute)

### Error: "Insufficient balance"
- Check your balance with `/api/trades/portfolio`
- Each user starts with $100,000

### Error: "You do not own this stock"
- Check your holdings with `/api/trades/holdings`
- Make sure you've bought the stock before selling

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URL in .env file
- Verify database connection string

---

## Next Steps

1. **Frontend Integration**
   - Use the API endpoints in your React/Vue/Angular app
   - Store JWT token in localStorage or cookies
   - Add token to all API requests

2. **Additional Features You Can Add**
   - Limit orders (buy/sell at specific price)
   - Stop-loss orders
   - Watchlist functionality
   - Price alerts
   - Historical data charts
   - Portfolio analytics

3. **Production Deployment**
   - Use environment variables for sensitive data
   - Add rate limiting
   - Add request validation
   - Add logging
   - Use HTTPS
   - Add error monitoring

---

## Support

For detailed API documentation, see `API_DOCUMENTATION.md`

For Finnhub API documentation: [https://finnhub.io/docs/api](https://finnhub.io/docs/api)
