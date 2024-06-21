const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
