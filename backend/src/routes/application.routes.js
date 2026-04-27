const router = require('express').Router();
const {
  applyForJob,
  getAllApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/application.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const applySchema = {
  job: { required: true },
  fullName: { required: true, maxLength: 100 },
  email: { required: true, isEmail: true },
  phone: { required: true },
};

// Public – applicant submits application (no file upload — resume via email/WhatsApp)
router.post('/', validate(applySchema), applyForJob);

// Admin-only
router.get('/', protect, getAllApplications);
router.get('/:id', protect, getApplication);
router.put('/:id/status', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
