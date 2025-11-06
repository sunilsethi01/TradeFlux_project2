# Windows Testing Guide for TradeFlux API

## Step 1: Start the Server

Open a terminal in the backend folder:

```powershell
npm start
```

Keep this terminal running! You should see:
```
App started
DB connected
```

## Step 2: Open a NEW Terminal

**Important:** Don't close the server terminal. Open a new terminal window for testing.

---

## Testing with PowerShell

### 1. Sign Up

```powershell
$body = @{
    email = "test@example.com"
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/auth/signup" -Method POST -Body $body -ContentType "application/json"
```

**Save the token from the response!**

### 2. Get Stock Quote

Replace `YOUR_TOKEN_HERE` with the token from signup:

```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:4000/api/stocks/quote/AAPL" -Method GET -Headers $headers
```

### 3. Buy Stock

```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}
$body = @{
    symbol = "AAPL"
    qty = 10
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/trades/buy" -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

### 4. Check Holdings

```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:4000/api/trades/holdings" -Method GET -Headers $headers
```

### 5. Check Portfolio

```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:4000/api/trades/portfolio" -Method GET -Headers $headers
```

### 6. Sell Stock

```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}
$body = @{
    symbol = "AAPL"
    qty = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/trades/sell" -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

---

## Complete Test Script

Save this as `test-api.ps1` and run it:

```powershell
# Test TradeFlux API

Write-Host "=== Testing TradeFlux API ===" -ForegroundColor Green

# 1. Sign Up
Write-Host "`n1. Creating new user..." -ForegroundColor Yellow
$signupBody = @{
    email = "test@example.com"
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/signup" -Method POST -Body $signupBody -ContentType "application/json"
    $token = $signupResponse.token
    Write-Host "✓ User created successfully!" -ForegroundColor Green
    Write-Host "Token: $token" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Signup failed: $_" -ForegroundColor Red
    exit
}

# 2. Get Stock Quote
Write-Host "`n2. Getting AAPL stock quote..." -ForegroundColor Yellow
$headers = @{
    Authorization = "Bearer $token"
}

try {
    $quote = Invoke-RestMethod -Uri "http://localhost:4000/api/stocks/quote/AAPL" -Method GET -Headers $headers
    Write-Host "✓ Current AAPL Price: $($quote.currentPrice)" -ForegroundColor Green
    Write-Host "  Change: $($quote.change) ($($quote.percentChange)%)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to get quote: $_" -ForegroundColor Red
}

# 3. Buy Stock
Write-Host "`n3. Buying 10 shares of AAPL..." -ForegroundColor Yellow
$buyBody = @{
    symbol = "AAPL"
    qty = 10
} | ConvertTo-Json

try {
    $buyResponse = Invoke-RestMethod -Uri "http://localhost:4000/api/trades/buy" -Method POST -Headers $headers -Body $buyBody -ContentType "application/json"
    Write-Host "✓ Purchase successful!" -ForegroundColor Green
    Write-Host "  Total Cost: $($buyResponse.order.total)" -ForegroundColor Cyan
    Write-Host "  New Balance: $($buyResponse.balance)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Purchase failed: $_" -ForegroundColor Red
}

# 4. Check Holdings
Write-Host "`n4. Checking holdings..." -ForegroundColor Yellow
try {
    $holdings = Invoke-RestMethod -Uri "http://localhost:4000/api/trades/holdings" -Method GET -Headers $headers
    Write-Host "✓ Holdings:" -ForegroundColor Green
    foreach ($holding in $holdings) {
        Write-Host "  $($holding.symbol): $($holding.qty) shares @ $($holding.price) (Avg: $($holding.avg))" -ForegroundColor Cyan
        Write-Host "    P&L: $($holding.profitLoss) ($($holding.net))" -ForegroundColor Cyan
    }
} catch {
    Write-Host "✗ Failed to get holdings: $_" -ForegroundColor Red
}

# 5. Check Portfolio
Write-Host "`n5. Checking portfolio summary..." -ForegroundColor Yellow
try {
    $portfolio = Invoke-RestMethod -Uri "http://localhost:4000/api/trades/portfolio" -Method GET -Headers $headers
    Write-Host "✓ Portfolio Summary:" -ForegroundColor Green
    Write-Host "  Cash Balance: $($portfolio.balance)" -ForegroundColor Cyan
    Write-Host "  Invested: $($portfolio.totalInvested)" -ForegroundColor Cyan
    Write-Host "  Current Value: $($portfolio.currentValue)" -ForegroundColor Cyan
    Write-Host "  P&L: $($portfolio.profitLoss) ($($portfolio.profitLossPercent))" -ForegroundColor Cyan
    Write-Host "  Total Portfolio: $($portfolio.totalPortfolioValue)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to get portfolio: $_" -ForegroundColor Red
}

# 6. Sell Stock
Write-Host "`n6. Selling 5 shares of AAPL..." -ForegroundColor Yellow
$sellBody = @{
    symbol = "AAPL"
    qty = 5
} | ConvertTo-Json

try {
    $sellResponse = Invoke-RestMethod -Uri "http://localhost:4000/api/trades/sell" -Method POST -Headers $headers -Body $sellBody -ContentType "application/json"
    Write-Host "✓ Sale successful!" -ForegroundColor Green
    Write-Host "  Total Revenue: $($sellResponse.order.total)" -ForegroundColor Cyan
    Write-Host "  Profit: $($sellResponse.order.profit)" -ForegroundColor Cyan
    Write-Host "  New Balance: $($sellResponse.balance)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Sale failed: $_" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Green
```

To run the script:
```powershell
.\test-api.ps1
```

---

## Recommended: Use Thunder Client (Easiest!)

1. **Install Thunder Client** in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search "Thunder Client"
   - Click Install

2. **Create Requests:**
   - Click Thunder Client icon in sidebar
   - Click "New Request"
   - Set method and URL
   - Add body/headers as needed
   - Click "Send"

3. **Example - Sign Up:**
   - Method: POST
   - URL: `http://localhost:4000/api/auth/signup`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "username": "testuser",
       "password": "password123"
     }
     ```
   - Click Send

4. **For Protected Routes:**
   - Go to "Headers" tab
   - Add: `Authorization: Bearer YOUR_TOKEN`

---

## Alternative: Use Postman

1. Download from https://www.postman.com/downloads/
2. Create new request
3. Same setup as Thunder Client

---

## Troubleshooting

### Server not running
- Make sure you see "App started" and "DB connected" in the server terminal
- Server must be running on port 4000

### "Cannot connect to server"
- Check if server is running: `npm start`
- Verify URL is `http://localhost:4000`
- Check if port 4000 is already in use

### "Token is not valid"
- Make sure you're using the token from signup/login response
- Format: `Authorization: Bearer YOUR_TOKEN`
- Token expires after 1 day

### PowerShell execution policy error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
