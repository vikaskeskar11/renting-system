/**
 * User Schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active'
  }
},
{
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
}
)
