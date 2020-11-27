/**
 * Token Schema
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = new Schema({
  name: { type: String },
  rentPrice: { type: Number },
  actualPrice: { type: Number },
  manufacturedOn: { type: Schema.Types.Date },
  isRentedOut: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})
