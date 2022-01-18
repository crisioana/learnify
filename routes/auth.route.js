const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/register').post(authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)
router.route('/logout').get(isAuthenticated, authCtrl.logout)
router.route('/refresh_token').get(authCtrl.refreshToken)
router.route('/google_login').post(authCtrl.googleLogin)
router.route('/facebook_login').post(authCtrl.facebookLogin)
router.route('/edit').patch(isAuthenticated, authCtrl.updateProfile)

module.exports = router