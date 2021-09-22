const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');
const { GAME_TYPES, GAME_LEVELS } = require('../constants/enums');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const problemSchema = new mongoose.Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  song_id: {
    type: ObjectId,
    ref: 'Song',
    required: true,
    autopopulate: true
  },
  problem_letter: {
    type: Number,
    required: true
  },
  problem_duration: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: GAME_TYPES,
    required: true
  },
  problem_lyrics: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    enum: GAME_LEVELS
  }
}, {timestamps: true});

roomSchema.plugin(autoPopulate);

module.exports = {
  Problem: mongoose.model('Problem', problemSchema)
};
