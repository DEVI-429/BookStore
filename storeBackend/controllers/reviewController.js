const Review = require('../models/review');

exports.getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'username');
        res.json(reviews);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addReview = async (req, res) => {
    try {
        const { bookId, review } = req.body;
        const newReview = new Review({
            bookId,
            userId: req.user.id,
            review
        });
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        review.review = req.body.review;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteReview = async (req, res) => {
    try {
        console.log('Received request to delete review with ID:', req.params.id);

        const review = await Review.findById(req.params.id);
        if (!review) {
            console.log('Review not found');
            return res.status(404).json({ msg: 'Review not found' });
        }

        console.log('Review found:', review);

        if (review.userId.toString() !== req.user.id) {
            console.log('User not authorized to delete this review');
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await review.deleteOne();
        console.log('Review removed successfully');
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error('Error while deleting review:', err.message);
        res.status(500).send('Server Error');
    }
};
