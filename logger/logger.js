/**
 * @file Initialize the log transports (targets to store logs) depending on configurations
 * Following three transports are supported and corresponding configuration to enable or disable
 * 1. MognoDB database (logger.logInDatabase)
 * 2. File (logger.logInFile)
 * 3. Console/Terminal (logger.logOnConsole)
 */

const config = require('config')
const path = require('path')
const winston = require('winston')

const transports = []
// Transport to store logs in file system. Every day new file will be created
if (config.logger.logInFile) {
  const DailyRotateFile = require('winston-daily-rotate-file')
  transports.push(new DailyRotateFile({
    format: winston.format.json(),
    name: 'fileLogs',
    storeHost: true,
    level: config.logger.level,
    filename: path.join(__dirname, '../logs', 'application.log'),
    handleExceptions: true
  }))
}
// TNA-1026 : All : Error object (like TypeError) in error logs is not visible in mongodb and console.
const enumerateErrorFormat = winston.format(info => {
  if (info.level === 'error' && info.metadata) {
    let err = info.metadata.err || info.metadata.error
    if (err instanceof Error) {
      info.metadata.err = Object.assign({
        message: err.message,
        stack: err.stack,
        code: err.code
      }, err)
    }
  }
  return info
})

// Transport to display logs on console
if (config.logger.logOnConsole) {
  transports.push(new (winston.transports.Console)({
    format: winston.format.combine(
      enumerateErrorFormat(),
      winston.format.json()
    ),
    level: config.logger.level,
    handleExceptions: true
  }))
}

//  For older versions of winston, it requires key instead of metaKey
const logger = winston.createLogger({
  format: winston.format.metadata({ metaKey: 'meta' }),
  transports: transports
})
logger.exitOnError = false

module.exports = logger
