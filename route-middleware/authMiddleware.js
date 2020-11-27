const tokenService = require('../services/tokenService')
const logger = require('../logger/logger')
// Provide direct access to route if it exists in nonSecurePath as it does not require authentication
const nonSecurePath = ['/user/login', '/version']
module.exports = async (req, res, next) => {
  if (nonSecurePath.includes(req.path)) {
    next()
  } else {
    try {
      const token = req.headers.token || ''
      const userInfo = await tokenService.verifyToken(token)
      req.user = userInfo
      next()
    } catch (error) {
      logger.error('authMiddleware ', { hostname: req.hostname, path: req.path, error: error })
      res.status(401).send({ error: error.message })
    }
  }
}
