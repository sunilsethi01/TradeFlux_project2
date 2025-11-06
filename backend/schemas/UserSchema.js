const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // e.g. user, admin
  balance: { type: Number, default: 100000 }, // Starting balance for trading
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
