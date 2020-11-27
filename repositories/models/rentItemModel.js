/**
 * Token Model
 */
const mongoose = require('mongoose')
const rentItemSchema = require('../schema/rentItemSchema')

module.exports = mongoose.model('rentItem', rentItemSchema, 'rentItem')
