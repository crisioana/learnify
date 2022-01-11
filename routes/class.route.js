const router = require('express').Router()
const classCtrl = require('./../controllers/classCtrl')

router.route('/').post(classCtrl.createClass)

module.exports = router