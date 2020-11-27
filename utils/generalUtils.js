const moment = require('moment')

class GeneralUtils {
  /**
   * @param  {String} string
   * @returns {Boolean}
   * @description returns boolean by checking if provided string is null or empty or undefined
   */
  isNullOrEmpty (string) {
    return !!(string === '' || string === null || string === undefined)
  }

  /**
   * @param  {Number} min
   * @param  {Number} max
   * @returns {Number}
   * @description Random number between provided min and max
   */
  rand (min, max) {
    var random = Math.random()
    return Math.floor(random * (max - min) + min)
  }

  /**
   * @param  {Object} obj
   * @param  {Array} properties
   * This function will delete specified properties from object
   */
  omitProperties (obj, properties) {
    properties.forEach((property) => {
      if (obj[property]) delete obj[property]
    })
    return obj
  }

  /**
   * Validate email ID for pattern
   * @param  {String} emailId
   */
  validateEmail (emailId) {
    const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const result = regex.test(emailId)
    return result
  }

  /**
   * @function
   * @name getDateDiff
   * @param {String} date1
   * @param {String} date2
   */
  getDateDiff (date1, date2) {
    return moment(date1).diff(moment, 'minutes')
  }
}

module.exports = new GeneralUtils()
