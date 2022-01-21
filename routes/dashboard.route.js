const router = require('express').Router()
const dashboardCtrl = require('./../controllers/dashboardCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/').get(isAuthenticated, authorizeRoles('Instructor'), dashboardCtrl.getDashboardInfo)

module.exports = router