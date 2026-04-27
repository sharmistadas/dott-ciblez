const router = require('express').Router();
const { login, logout, getMe, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const loginSchema = {
  email: { required: true, isEmail: true },
  password: { required: true },
};

router.post('/login', validate(loginSchema), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
