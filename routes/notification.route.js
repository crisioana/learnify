const router = require('express').Router()
const notificationCtrl = require('./../controllers/notificationCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/')
  .get(isAuthenticated, notificationCtrl.getAllNotifications)
  .post(isAuthenticated, notificationCtrl.createNotification)

router.route('/:id')
  .patch(isAuthenticated, notificationCtrl.readNotification)

module.exports = router