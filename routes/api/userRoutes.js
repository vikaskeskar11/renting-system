const express = require('express')
const router = express.Router()
const userService = require('../../services/userService')
const logger = require('../../logger/logger')

router.post('/add', async (req, res) => {
  try {
    const user = userService.add(req.body)
    res.status(200).send(user)
  } catch (error) {
    logger.error('UserRoutes:add: Error while adding user ', { error })
    res.status(500).send({ error: error.message })
  }
})

router.put('/update', async (req, res) => {
  try {
    const user = userService.updateUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    logger.error('UserRoutes:add: Error while updating user ', { error })
    res.status(500).send({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const user = userService.getUserById(req.user.userId)
    res.status(200).send(user)
  } catch (error) {
    logger.error('UserRoutes:add: Error while getting user ', { error })
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
