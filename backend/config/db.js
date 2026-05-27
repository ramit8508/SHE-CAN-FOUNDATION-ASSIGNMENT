const mongoose = require('mongoose');
const dns = require('dns');

// Force Google DNS to resolve MongoDB Atlas SRV records
// (ISP/router DNS may not support SRV lookups required by mongodb+srv://)
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('   Full error:', error);
    console.warn('⚠️  Server starting without database. Some features will be unavailable.');
    // Don't exit - allow server to run for testing
  }
};

module.exports = connectDB;
