require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const connectDB = require('../config/db');

async function createAdmin() {
  await connectDB();

  const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  const name = 'Super Admin';

  if (!email || !password) {
    console.error('❌ Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  try {
    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log(`ℹ️  Admin already exists: ${email}`);
      process.exit(0);
    }

    const admin = await AdminUser.create({ name, email, password, role: 'super_admin' });
    console.log(`✅ Super admin created: ${admin.email}`);
    console.log('⚠️  Change the password after first login and remove BOOTSTRAP_ADMIN_PASSWORD from .env');
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
