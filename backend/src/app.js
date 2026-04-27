const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { errorHandler, notFound } = require('./middlewares/error.middleware');

// Route imports
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const teamRoutes = require('./routes/team.routes');
const applicationRoutes = require('./routes/application.routes');
const inquiryRoutes = require('./routes/inquiry.routes');
const bookingRoutes = require('./routes/booking.routes');
const blogRoutes = require('./routes/blog.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// --------------- Global Middlewares ---------------

// Security headers
app.use(helmet());

// CORS
const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173';
const allowedOrigins = rawOrigins
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);
const isDev = process.env.NODE_ENV !== 'production';
const isLocalhostOrigin = (origin) =>
  typeof origin === 'string' &&
  (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || (isDev && isLocalhostOrigin(origin))) {
        callback(null, true);
        return;
      }
      const err = new Error('Not allowed by CORS');
      err.statusCode = 403;
      callback(err);
    },
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// --------------- Routes ---------------

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Dott Ciblez API is running' });
});

// Admin auth
app.use('/api/auth', authRoutes);

// Public + Admin endpoints
app.use('/api/jobs', jobRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blogs', blogRoutes);

// Public submission + Admin management
app.use('/api/applications', applicationRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Admin dashboard
app.use('/api/dashboard', dashboardRoutes);

// --------------- Error Handling ---------------

app.use(notFound);
app.use(errorHandler);

module.exports = app;
