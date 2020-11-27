/**
 * This file has all path and associated express route. app.js loads path and
 * routes
 */

var routes = [
  {
    path: '/api/version',
    route: require('./api/versionRoute')
  },
  {
    path: '/healthCheck',
    route: require('./health/healthCheckRoutes')
  }
]

module.exports = {
  httpsRoutes: () => {
    return routes
  }
}
