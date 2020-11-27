const UserModel = require('../repositories/models/userModel')
const tokenService = require('./tokenService')
const { omitProperties } = require('../utils/generalUtils')

class UserService {
  /**
   * @function
   * @name isUsernameExist
   * @param {string} userId - id of user to check against.
   * @returns {Boolean}
   * @description Check user exists or not.
   * */
  async isUsernameExist (userId) {
    // estimatedDocumentCount:  used instead of count due to deprecation warning of count
    const isExists = await UserModel.find({ username: userId }).countDocuments().exec()
    return isExists
  }

  /**
   * @function
   * @name add
   * @param {Object} data - user data.
   * @returns {Object}
   * @description Add user to database.
   * */
  async add (data) {
    const exists = await this.isUsernameExist(data.username)
    if (exists) {
      throw new Error('user.exists')
    }

    if (!exists) {
      const user = new UserModel(data)
      let res = await user.save()
      res = res.toObject()
      res = omitProperties(res, ['password'])
      return res
    }
  }

  /**
   * @function
   * @name update
   * @param {Object} data - user data.
   * @returns {Object}
   * @description Update user to database.
   * */
  async update (data) {
    const _id = data._id
    data = omitProperties(data, ['_id'])
    let res = await UserModel.updateOne({ _id }, data)
    res = omitProperties(res, ['password'])
    return res
  }

  /**
   * @function
   * @name verifyCredentials
   * @param {object} data - user credentials.
   * @param {string} data.username - username of user.
   * @param {string} data.password - password of user.
   * @returns {Object}
   * @description verify credentials of user.
   */
  async verifyCredentials (data) {
    const user = await UserModel.findOne({ username: new RegExp('^' + data.username + '$', 'i') })
    if (user) {
      const isMatch = await user.comparePassword(data.password, user.password)
      if (isMatch) {
        return user
      } else {
        throw Error('user.invalidPassword')
      }
    } else {
      throw Error('user.notFound')
    }
  }

  /**
   * @function
   * @name login
   * @param {object} user - user credentials.
   * @param {string} user.username - username of user.
   * @param {string} user.password - password of user.
   * @returns {Object}
   * @description Login user and return token.
   */
  async login (user) {
    let data = await this.verifyCredentials(user)
    data = {
      _id: data._id,
      username: data.username,
      email: data.email
    }
    const token = await tokenService.generateToken(data)
    return { data, token: token.token }
  }

  /**
   * @function
   * @name logout
   * @param {string}  _id - id of user to logout.
   * @returns {Object}
   * @description logout user and remove token.
   */
  async logout (_id, token) {
    const result = await tokenService.removeToken(_id, token)
    return result
  }

  /**
  * @function
  * @name getUserById
  * @param {userId}  _id - id of logged in user.
  * @returns {Object}
  * @description Return user information
  */
  async getUserById (userId) {
    if (!userId) {
      throw Error('user.requireId')
    }
    const user = await UserModel.findById(userId).select({ password: 0 })
    if (!user) {
      throw Error('user.notFound')
    }
    return user
  }
}

module.exports = new UserService()
