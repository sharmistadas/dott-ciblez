const router = require('express').Router();
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/job.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const jobSchema = {
  title: { required: true, maxLength: 150 },
  department: { required: true },
  location: { required: true },
  description: { required: true },
};

// Public routes (optionalAuth so admin sees all jobs)
router.get('/', optionalAuth, getAllJobs);
router.get('/:id', getJob);

// Admin-only routes
router.post('/', protect, validate(jobSchema), createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
