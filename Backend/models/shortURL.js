const mongoose = require('mongoose');

const shortURLSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_code: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  click_count: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('shortURL', shortURLSchema);
