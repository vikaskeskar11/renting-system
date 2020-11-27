const logger = require('../logger/logger')
const RentItemModel = require('../repositories/models/rentItemModel')
const { omitProperties } = require('../utils/generalUtils')

class RentItemService {
  /**
   * @function
   * @name add
   * @param {Object} data
   */
  async add (data) {
    logger.info('RentItemService:add: Adding new rent item ')
    const rentItem = new RentItemModel(data)
    const result = await rentItem.save()
    logger.info('RentItemService:add: Added new rent item ')
    return result
  }

  async update (data) {
    const _id = data._id
    data = omitProperties(data, ['_id'])
    let rentItem = await RentItemModel.findById(_id)
    if (!rentItem.isRentedOut) {
      logger.info('RentItemService:add: Adding new rent item ', { _id })
      rentItem = await RentItemModel.updateOne({ _id }, data)
      logger.info('RentItemService:add: Added new rent item ', { _id })
    } else {
      throw new Error('You can update item as it is rented out. Please try when item will be with you.')
    }
    return rentItem
  }
}

module.exports = new RentItemService()
