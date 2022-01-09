const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')

router.route('/register').post(authCtrl.register)
router.route('/login').post(authCtrl.login)

module.exports = router