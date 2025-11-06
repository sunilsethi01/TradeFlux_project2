const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true }, // Stock symbol (e.g., AAPL, TSLA)
    name: String,
    qty: { type: Number, required: true },
    avg: { type: Number, required: true }, // Average buy price
    price: Number, // Current market price
    net: String,
    day: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports ={HoldingsSchema};