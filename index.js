var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var routes = require('./routes')
require('./init')
const authMiddleware = require('./route-middleware/authMiddleware')
require('./db-connections/connection')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
global.isDevEnv = app.get('env') === 'development'
app.use(cors({ origin: '*' }))
app.use(logger('common'))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use('/domino/api', authMiddleware)
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* Load http routes defined routes/routes.js */
routes.httpsRoutes().forEach((item) => {
  app.use(item.path, item.route)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
