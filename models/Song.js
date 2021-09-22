const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const songSchema = new mongoose.Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  singer: {
    type: String,
    default: 'Various Artist',
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  file: {
    type: Buffer
  }
}, {timestamps: true});

module.exports = {
  Song: mongoose.model('Song', songSchema)
};
