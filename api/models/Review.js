const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewModel = {
    reviewText: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastInitial: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}

const reviewSchema = new Schema(ReviewModel)
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;