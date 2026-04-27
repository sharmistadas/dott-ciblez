const router = require('express').Router();
const { subscribe, getAllSubscribers, deleteSubscriber } = require('../controllers/newsletter.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public – subscribe from Career CTA or Blog page
router.post('/subscribe', subscribe);

// Admin-only
router.get('/', protect, getAllSubscribers);
router.delete('/:id', protect, deleteSubscriber);

module.exports = router;
