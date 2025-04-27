const mongoose = require('mongoose');

const CreditHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Earn', 'Spend'], required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CreditHistory', CreditHistorySchema);