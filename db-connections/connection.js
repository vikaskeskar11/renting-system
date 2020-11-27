const mongoose = require('mongoose')
const config = require('config')
const logger = require('../logger/logger')
mongoose.set('debug', process.env.NODE_ENV === 'development')
class DBConnection {
  constructor () {
    this.isConnectedBefore = false
    logger.info('DBConnection:connect: Initiating DB Connection')
  }

  connect () {
    const url = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.databases.name}?authSource=admin`
    mongoose.connect(url, { useNewUrlParser: true })

    mongoose.connection.on('error', error => {
      logger.error('DBConnection:connect: ', { msg: 'Could not connect to MongoDB', error: error })
    })

    mongoose.connection.on('disconnected', () => {
      logger.error('DBConnection:connect: ', { msg: 'Lost MongoDB connection...' })
      if (!this.isConnectedBefore) { setTimeout(this.connect, 5000) }
    })

    mongoose.connection.on('connected', () => {
      this.isConnectedBefore = true
      require('../init')
      logger.info('DBConnection:connect: ', { msg: 'Connection established to MongoDB' })
    })

    mongoose.connection.on('reconnected', () => {
      logger.error('DBConnection:connect: ', { msg: 'Reconnected to MongoDB' })
    })
  }
}

module.exports = new DBConnection().connect()
