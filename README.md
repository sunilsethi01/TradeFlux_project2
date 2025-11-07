# 📈 TradeFlux - Smart Trading Platform

<div align="center">

![TradeFlux Logo](frontend/public/media/images/tradeflux-logo%20(1).svg)

**A Modern, Full-Stack Stock Trading Simulation Platform**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://tradeflux-smart-trading-sunilsethi01.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

</div>

---

## 🌟 Overview

**TradeFlux** is a feature-rich, production-ready stock trading simulation platform that empowers users to practice trading strategies without financial risk. Built with modern web technologies and best practices, TradeFlux offers a seamless, responsive experience across all devices.

### 🎯 Key Highlights

- 🚀 **Full-Stack Architecture** - MERN stack with scalable design
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 💼 **Real Portfolio Management** - Track holdings, positions, and performance
- 📊 **Interactive Dashboard** - Real-time data visualization
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- ☁️ **Cloud Deployed** - Frontend on Netlify, Backend on Render

---

## ✨ Features

### 🔒 **Authentication & Security**
- User registration with email validation
- Secure login with JWT tokens
- Password encryption using bcrypt
- Protected routes and API endpoints
- Session management with auto-logout

### 💰 **Portfolio Management**
- Real-time portfolio value tracking
- Detailed holdings view with P&L calculation
- Position management (open/closed)
- Transaction history
- Fund management (add/withdraw)

### 📊 **Trading Interface**
- Interactive watchlist with search
- Buy/sell order placement
- Market/limit order support
- Order confirmation dialogs
- Real-time price updates

### 📈 **Dashboard Analytics**
- Equity summary with visual charts
- Holdings breakdown
- Performance metrics (returns %)
- Investment vs Current Value comparison
- Responsive data tables

### 🎨 **User Experience**
- Smooth page transitions
- Loading states and error handling
- Toast notifications for actions
- Responsive hamburger menu
- Profile dropdown with account info
- Clean, modern design language

---

## 🛠️ Tech Stack

### **Frontend**
```
⚛️  React 18.x          - UI framework
🎨  CSS3                - Styling with flexbox/grid
🎭  React Router 6.x    - Client-side routing
📡  Axios               - HTTP client
🍞  React Toastify      - Notifications
⚡  Bootstrap 5.x       - UI components
```

### **Backend**
```
🟢  Node.js 18.x        - Runtime environment
🚂  Express.js 4.x      - Web framework
🍃  MongoDB             - NoSQL database
🔑  JWT                 - Authentication tokens
🔐  bcryptjs            - Password hashing
✅  CORS                - Cross-origin handling
```

### **Deployment**
```
☁️  Netlify             - Frontend hosting
🎨  Render              - Backend API hosting
🗄️  MongoDB Atlas       - Database hosting
```

---

## 📁 Project Structure

```
TradeFlux/
│
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── media/          # Images, icons
│   │   └── _redirects      # Netlify SPA routing
│   │
│   └── src/
│       ├── landing_page/   # Marketing pages
│       │   ├── about/
│       │   ├── pricing/
│       │   ├── products/
│       │   ├── support/
│       │   ├── user/       # Auth components
│       │   ├── Navbar.js
│       │   └── Footer.js
│       │
│       ├── dashboard/      # Trading dashboard
│       │   ├── Dashboard.js
│       │   ├── TopBar.js
│       │   ├── Menu.js
│       │   ├── WatchList.js
│       │   └── GeneralContext.js
│       │
│       ├── App.js          # Main app component
│       ├── AuthContext.js  # Auth state management
│       ├── config.js       # API configuration
│       ├── index.css       # Global styles
│       └── dashboard.css   # Dashboard styles
│
├── backend/                 # Express backend API
│   ├── middleware/         # Auth & validation
│   ├── model/             # MongoDB schemas
│   │   ├── UserModel.js
│   │   ├── HoldingsModel.js
│   │   ├── PositionsModel.js
│   │   └── OrdersModel.js
│   │
│   ├── routes/            # API endpoints
│   │   ├── auth.js       # Authentication routes
│   │   └── trades.js     # Trading operations
│   │
│   ├── schemas/           # Validation schemas
│   └── index.js           # Server entry point
│
├── .gitignore
├── netlify.toml           # Netlify configuration
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sunilsethi01/TradeFlux_project2.git
   cd TradeFlux
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**

   Create `.env` in `backend/`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   PORT=4000
   ```

   Create `.env` in `frontend/`:
   ```env
   REACT_APP_API_URL=http://localhost:4000
   ```

5. **Run the application**

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm start
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:4000
   ```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - User login
GET    /api/auth/check-auth   - Verify token
POST   /api/auth/logout       - User logout
```

### Trading Operations
```
GET    /api/trades/portfolio  - Get user portfolio
GET    /api/trades/holdings   - Get holdings
GET    /api/trades/positions  - Get positions
POST   /api/trades/orders     - Place order
GET    /api/trades/orders     - Get order history
```

---

## 🎨 Design Features

### **Responsive Design**
- ✅ Mobile-first approach
- ✅ Breakpoints: 480px, 768px, 992px, 1024px
- ✅ Touch-friendly UI elements
- ✅ Adaptive navigation (hamburger menu)

### **UI Components**
- Gradient backgrounds with modern colors
- Smooth transitions and hover effects
- Box shadows for depth
- Loading spinners and skeletons
- Toast notifications (success/error)
- Modal dialogs for confirmations

### **Performance**
- Code splitting with React.lazy
- Optimized images and assets
- Efficient state management
- Debounced search inputs
- Cached API responses

---

## 🔐 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Token-Based Auth**: JWT with secure httpOnly cookies
- **CORS Protection**: Configured allowed origins
- **Input Validation**: Server-side validation schemas
- **SQL Injection Prevention**: MongoDB parameterized queries
- **XSS Protection**: Input sanitization
- **Environment Variables**: Sensitive data in .env files

---

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  balance: Number (default: 100000)
}
```

### Holdings Model
```javascript
{
  userId: ObjectId (ref: User),
  stockName: String,
  quantity: Number,
  avgPrice: Number,
  currentPrice: Number,
  profitLoss: Number
}
```

### Positions Model
```javascript
{
  userId: ObjectId (ref: User),
  stockName: String,
  quantity: Number,
  buyPrice: Number,
  currentPrice: Number,
  status: String (open/closed)
}
```

### Orders Model
```javascript
{
  userId: ObjectId (ref: User),
  stockName: String,
  type: String (buy/sell),
  quantity: Number,
  price: Number,
  timestamp: Date,
  status: String (pending/executed/cancelled)
}
```

---

## 🎯 Deployment

### Frontend (Netlify)

1. **Build Configuration**
   ```toml
   [build]
     base = "frontend"
     publish = "build"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables**
   - `REACT_APP_API_URL`: Backend API URL
   - `CI`: false (to ignore warnings)
   - `NODE_VERSION`: 18

### Backend (Render)

1. **Environment Variables**
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT
   - `FRONTEND_URL`: Frontend URL (for CORS)
   - `PORT`: 4000

---

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

---

## 📈 Future Enhancements

- [ ] Real-time stock price integration (Alpha Vantage, Yahoo Finance)
- [ ] Advanced charting (TradingView integration)
- [ ] Watchlist alerts and notifications
- [ ] Social trading features
- [ ] Paper trading competitions
- [ ] Mobile app (React Native)
- [ ] AI-powered trading suggestions
- [ ] Multiple portfolio support
- [ ] Export reports (PDF/CSV)
- [ ] Dark mode theme

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sunil Sethi**

- GitHub: [@sunilsethi01](https://github.com/sunilsethi01)
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- React documentation and community
- Express.js and Node.js teams
- MongoDB for excellent database
- Bootstrap for UI components
- Netlify and Render for hosting

---

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Sunil Sethi

</div>
