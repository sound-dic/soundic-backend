const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');
const { STATUS_TYPES } = require('../constants/enums');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const roomSchema = new mongoose.Schema({
  room_id: {type: Number, unique: true, required: true},
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  members: [{
    type: ObjectId,
    ref: 'User'
  }],
  problem: {
    type: ObjectId,
    ref: 'Problem',
    autopopulate: true
  },
  status: {
    type: String,
    enum: STATUS_TYPES,
    required: true
  }
}, {timestamps: true});

roomSchema.plugin(autoPopulate);

module.exports = {
  Room: mongoose.model('Room', roomSchema)
};
