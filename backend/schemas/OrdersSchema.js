const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    name: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, enum: ['BUY', 'SELL'], required: true },
    orderType: { type: String, enum: ['MARKET', 'LIMIT'], default: 'MARKET' },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'COMPLETED' },
    createdAt: { type: Date, default: Date.now }
});

module.exports ={OrdersSchema};