# TradeFlux API Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
FINNHUB_API_KEY=your_finnhub_api_key_here
PORT=4000
```

### 3. Get Finnhub API Key
1. Visit [https://finnhub.io/](https://finnhub.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### 4. Start Server
```bash
npm start
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Sign Up
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "msg": "User signed up successfully!"
}
```

#### 2. Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "username": "username",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "msg": "Login successful",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com"
  }
}
```

#### 3. Check Auth Status
- **GET** `/api/auth/check-auth`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "isAuthenticated": true,
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### Stock Routes (`/api/stocks`)
**All routes require authentication**

#### 1. Get Stock Quote
- **GET** `/api/stocks/quote/:symbol`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/stocks/quote/AAPL`
- **Response:**
```json
{
  "symbol": "AAPL",
  "currentPrice": 175.50,
  "change": 2.30,
  "percentChange": 1.33,
  "high": 176.20,
  "low": 173.80,
  "open": 174.00,
  "previousClose": 173.20,
  "timestamp": 1699564800
}
```

#### 2. Search Stocks
- **GET** `/api/stocks/search/:query`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/stocks/search/apple`
- **Response:**
```json
{
  "count": 10,
  "results": [
    {
      "description": "APPLE INC",
      "displaySymbol": "AAPL",
      "symbol": "AAPL",
      "type": "Common Stock"
    }
  ]
}
```

#### 3. Get Company Profile
- **GET** `/api/stocks/profile/:symbol`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/stocks/profile/AAPL`
- **Response:**
```json
{
  "country": "US",
  "currency": "USD",
  "exchange": "NASDAQ",
  "name": "Apple Inc",
  "ticker": "AAPL",
  "ipo": "1980-12-12",
  "marketCapitalization": 2800000,
  "shareOutstanding": 15634.2,
  "logo": "https://...",
  "phone": "14089961010",
  "weburl": "https://www.apple.com/"
}
```

#### 4. Get Multiple Quotes
- **POST** `/api/stocks/quotes`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "symbols": ["AAPL", "TSLA", "GOOGL"]
}
```
- **Response:**
```json
{
  "quotes": [
    {
      "symbol": "AAPL",
      "currentPrice": 175.50,
      "change": 2.30,
      "percentChange": 1.33,
      "high": 176.20,
      "low": 173.80,
      "open": 174.00,
      "previousClose": 173.20
    }
  ]
}
```

#### 5. Get Market News
- **GET** `/api/stocks/news`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of news articles

#### 6. Get Company News
- **GET** `/api/stocks/news/:symbol`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/stocks/news/AAPL`
- **Response:** Array of company-specific news articles

---

### Trade Routes (`/api/trades`)
**All routes require authentication**

#### 1. Buy Stock
- **POST** `/api/trades/buy`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "symbol": "AAPL",
  "qty": 10,
  "orderType": "MARKET"
}
```
- **Response:**
```json
{
  "msg": "Stock purchased successfully",
  "order": {
    "symbol": "AAPL",
    "qty": 10,
    "price": 175.50,
    "total": 1755.00
  },
  "balance": 98245.00
}
```

#### 2. Sell Stock
- **POST** `/api/trades/sell`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "symbol": "AAPL",
  "qty": 5,
  "orderType": "MARKET"
}
```
- **Response:**
```json
{
  "msg": "Stock sold successfully",
  "order": {
    "symbol": "AAPL",
    "qty": 5,
    "price": 176.00,
    "total": 880.00,
    "profit": 2.50
  },
  "balance": 99125.00
}
```

#### 3. Get Holdings
- **GET** `/api/trades/holdings`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
[
  {
    "userId": "user_id",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "qty": 5,
    "avg": 175.50,
    "price": 176.00,
    "net": "0.28%",
    "profitLoss": 2.50,
    "totalValue": 880.00,
    "totalCost": 877.50
  }
]
```

#### 4. Get Orders
- **GET** `/api/trades/orders`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
[
  {
    "_id": "order_id",
    "userId": "user_id",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "qty": 10,
    "price": 175.50,
    "mode": "BUY",
    "orderType": "MARKET",
    "status": "COMPLETED",
    "createdAt": "2024-11-05T06:38:00.000Z"
  }
]
```

#### 5. Get Positions
- **GET** `/api/trades/positions`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of user positions

#### 6. Get Portfolio Summary
- **GET** `/api/trades/portfolio`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "balance": 98245.00,
  "totalInvested": 1755.00,
  "currentValue": 1760.00,
  "profitLoss": 5.00,
  "profitLossPercent": "0.28%",
  "totalPortfolioValue": 100005.00,
  "holdingsCount": 1
}
```

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned upon successful signup or login.

---

## Error Responses

### 400 Bad Request
```json
{
  "msg": "Error message describing the issue"
}
```

### 401 Unauthorized
```json
{
  "msg": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "msg": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "msg": "Error message",
  "error": "Detailed error description"
}
```

---

## Database Schema

### User
- `email`: String (unique, required)
- `username`: String (unique, required)
- `password`: String (hashed, required)
- `role`: String (default: 'user')
- `balance`: Number (default: 100000)
- `createdAt`: Date

### Holdings
- `userId`: ObjectId (ref: User)
- `symbol`: String (stock symbol)
- `name`: String (company name)
- `qty`: Number (quantity)
- `avg`: Number (average buy price)
- `price`: Number (current price)
- `net`: String (profit/loss percentage)
- `day`: String (day change)
- `createdAt`: Date
- `updatedAt`: Date

### Orders
- `userId`: ObjectId (ref: User)
- `symbol`: String
- `name`: String
- `qty`: Number
- `price`: Number
- `mode`: String (BUY/SELL)
- `orderType`: String (MARKET/LIMIT)
- `status`: String (PENDING/COMPLETED/CANCELLED)
- `createdAt`: Date

### Positions
- `userId`: ObjectId (ref: User)
- `product`: String
- `symbol`: String
- `name`: String
- `qty`: Number
- `avg`: Number
- `price`: Number
- `net`: String
- `day`: String
- `isLoss`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

---

## Notes

1. **Starting Balance**: Each new user starts with $100,000 virtual balance
2. **Stock Symbols**: Use standard US stock symbols (e.g., AAPL, TSLA, GOOGL)
3. **Market Orders**: Execute immediately at current market price
4. **Finnhub API**: Free tier has rate limits (60 calls/minute)
5. **Real-time Data**: Stock prices are fetched in real-time from Finnhub
6. **Holdings Update**: When buying the same stock multiple times, average price is calculated automatically
7. **Sell Validation**: System checks if user has sufficient quantity before selling

---

## Testing with Postman/Thunder Client

### Example Flow:

1. **Sign Up**
   - POST `/api/auth/signup`
   - Get token from response

2. **Get Stock Quote**
   - GET `/api/stocks/quote/AAPL`
   - Add token to Authorization header

3. **Buy Stock**
   - POST `/api/trades/buy`
   - Body: `{"symbol": "AAPL", "qty": 10}`

4. **Check Holdings**
   - GET `/api/trades/holdings`

5. **Check Portfolio**
   - GET `/api/trades/portfolio`

6. **Sell Stock**
   - POST `/api/trades/sell`
   - Body: `{"symbol": "AAPL", "qty": 5}`
