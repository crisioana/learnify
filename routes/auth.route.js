const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')

router.route('/register').post(authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)
router.route('/logout').get(authCtrl.logout)
router.route('/refresh_token').get(authCtrl.refreshToken)
router.route('/google_login').post(authCtrl.googleLogin)

module.exports = router