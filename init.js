const userService = require('./services/userService')

class InitSystem {
  constructor () {
    this.add()
  }

  async add () {
    const username = 'admin@test.com'
    const isExists = await userService.isUsernameExist(username)
    if (!isExists) {
      await userService.add(
        { username,
          password: 'testpassword',
          firstName: 'Test',
          lastName: 'User'
        })
    }
  }
}

module.exports = new InitSystem()
