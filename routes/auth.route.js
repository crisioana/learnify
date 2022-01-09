const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')

router.route('/register').post(authCtrl.register)

module.exports = router