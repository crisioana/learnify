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
router.route('/change_password').patch(isAuthenticated, authCtrl.changePassword)
router.route('/forget_password').post(authCtrl.forgetPassword)
router.route('/reset_password').patch(authCtrl.resetPassword)

module.exports = router