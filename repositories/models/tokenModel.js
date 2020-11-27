/**
 * Token Model
 */
const mongoose = require('mongoose')
const tokenSchema = require('../schema/tokenSchema')

module.exports = mongoose.model('token', tokenSchema, 'tokens')
