const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: String,
    symbol: { type: String, required: true },
    name: String,
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports ={PositionsSchema};