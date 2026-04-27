const app = require('./app');
const { connectDB } = require('./config/db');
const { logger } = require('./utils/logger');

// Load env vars
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
