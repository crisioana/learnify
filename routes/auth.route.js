const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')

router.route('/register').post(authCtrl.register)
router.route('/login').post(authCtrl.login)
router.route('/logout').get(authCtrl.logout)

module.exports = router