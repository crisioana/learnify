const router = require('express').Router()
const classCtrl = require('./../controllers/classCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/')
  .get(isAuthenticated, classCtrl.getClassesByInstructor)
  .post(isAuthenticated, authorizeRoles('Instructor'), classCtrl.createClass)

router.route('/student').get(isAuthenticated, authorizeRoles('Student'), classCtrl.getStudentClasses)

router.route('/restrict/:id').patch(isAuthenticated, authorizeRoles('Instructor'), classCtrl.changeRestrictStatus)
router.route('/rename/:id').patch(isAuthenticated, authorizeRoles('Instructor'), classCtrl.renameClass)
router.route('/join/:id').patch(isAuthenticated, authorizeRoles('Student'), classCtrl.joinClass)

module.exports = router