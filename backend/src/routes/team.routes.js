const router = require('express').Router();
const {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/teamMember.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { uploadPhoto } = require('../middlewares/upload.middleware');
const { validate } = require('../middlewares/validate.middleware');

const memberSchema = {
  name: { required: true, maxLength: 100 },
  role: { required: true },
  category: { required: true },
};

// Public (optionalAuth so admin sees all including inactive)
router.get('/', optionalAuth, getAllMembers);
router.get('/:id', getMember);

// Admin-only
router.post('/', protect, uploadPhoto.single('avatar'), validate(memberSchema), createMember);
router.put('/:id', protect, uploadPhoto.single('avatar'), updateMember);
router.delete('/:id', protect, deleteMember);

module.exports = router;
