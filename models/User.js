const mongoose = require('mongoose');
const { LOGIN_TYPES } = require('../constants/enums');

const userSchema = new mongoose.Schema({
  access_token: String,
  access_expired_at: Date,
  refresh_token: String,
  refresh_expired_at: Date,
  jwt_key: String,
  last_address: String,
  uid: {
    type: Number,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    min: 4,
    max: 30,
    required: true,
    trim: true
  },
  login_type: {
    type: String,
    enum: LOGIN_TYPES,
    required: true
  },
  rank: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = {
  User: mongoose.model('User', userSchema)
};
