const router = require('express').Router()
const classCtrl = require('./../controllers/classCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/')
  .get(isAuthenticated, classCtrl.getClassesByInstructor)
  .post(isAuthenticated, authorizeRoles('Instructor'), classCtrl.createClass)

module.exports = router