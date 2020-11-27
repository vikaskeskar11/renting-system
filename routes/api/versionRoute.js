const express = require('express')
const router = express.Router()
var { version } = require('../../package.json')

router.get('/', (req, res) => {
  res.send({ version: version })
})

module.exports = router
