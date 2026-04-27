/**
 * Admin Seed Script
 *
 * Run once to create the initial admin account:
 *   node src/seeds/admin.seed.js
 *
 * You can customise the credentials below or pass via env vars:
 *   ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const { logger } = require('../utils/logger');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dottciblez.com';

    // Check if admin already exists
    const existing = await Admin.findOne({ email: adminEmail });
    if (existing) {
      logger.info(`Admin already exists: ${adminEmail}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || 'Super Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
    });

    logger.info(`Admin created successfully!`);
    logger.info(`  Name:  ${admin.name}`);
    logger.info(`  Email: ${admin.email}`);
    logger.info(`  (Change the default password immediately)`);

    process.exit(0);
  } catch (error) {
    logger.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
