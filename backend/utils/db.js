const mongoose = require('mongoose');
const util = require('util');

/**
 * Connect to MongoDB with retry/backoff.
 * @param {string} uri - MongoDB connection string
 * @param {object} options - mongoose connect options
 */
async function connectDB(uri, options = {}) {
  const maxRetries = parseInt(process.env.DB_CONNECT_MAX_RETRIES, 10) || 5;
  const baseDelay = parseInt(process.env.DB_CONNECT_BASE_DELAY_MS, 10) || 1000; // 1s

  let attempt = 0;

  const finalUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_tourist_safety';

  const defaultOptions = Object.assign({
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, options);

  const connectOnce = async () => {
    attempt += 1;
    try {
      await mongoose.connect(finalUri, defaultOptions);
      console.log('✅ Connected to MongoDB');
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${attempt} failed:`, err.message || err);
      if (attempt >= maxRetries) {
        console.error(`❌ Exceeded max retries (${maxRetries}).`);
        throw err;
      }
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Retrying MongoDB connection in ${delay}ms...`);
      await util.promisify(setTimeout)(delay);
      return connectOnce();
    }
  };

  return connectOnce();
}

module.exports = {
  connectDB,
  mongoose
};
