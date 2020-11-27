/**
 * Generate password form allowed word
 */
var merge = require('utils-merge')
var digits = '0123456789'
var generalUtils = require('./generalUtils')
var alphabets = 'abcdefghijklmnopqrstuvwxyz'
var upperCase = alphabets.toUpperCase()
var specialChars = '#!&@'
var defaultOptions = { digits: true, alphabets: true, upperCase: true, specialChars: true }

class PasswordGenerator {
  generate (length, options) {
    length = length || 10
    options = merge(defaultOptions, options)
    var allowsChars = ((options.digits || '') && digits) +
      ((options.alphabets || '') && alphabets) +
      ((options.upperCase || '') && upperCase) +
      ((options.specialChars || '') && specialChars)
    var password = ''
    for (var index = 0; index < length; ++index) {
      var charIndex = generalUtils.rand(1, allowsChars.length)
      password += allowsChars[charIndex]
    }
    return password
  }
}

module.exports = new PasswordGenerator()
