const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');

router.get('/:bookId', reviewController.getBookReviews);
router.post('/', auth, reviewController.addReview);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
