const router = require('express').Router()
const classCtrl = require('./../controllers/classCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/')
  .get(isAuthenticated, authorizeRoles('Instructor'), classCtrl.getClassesByInstructor)
  .post(isAuthenticated, authorizeRoles('Instructor'), classCtrl.createClass)

router.route('/student').get(isAuthenticated, authorizeRoles('Student'), classCtrl.getStudentClasses)

router.route('/:id')
  .get(classCtrl.getClassDetail)
  .delete(isAuthenticated, authorizeRoles('Instructor'), classCtrl.deleteClass)

router.route('/restrict/:id').patch(isAuthenticated, authorizeRoles('Instructor'), classCtrl.changeRestrictStatus)
router.route('/rename/:id').patch(isAuthenticated, authorizeRoles('Instructor'), classCtrl.renameClass)
router.route('/join/:id').patch(isAuthenticated, authorizeRoles('Student'), classCtrl.joinClass)
router.route('/kick/:id').patch(isAuthenticated, authorizeRoles('Instructor'), classCtrl.kickStudent)

router.route('/search/instructor/:id').get(classCtrl.searchInstructorClass)
router.route('/search/student').get(isAuthenticated, classCtrl.searchStudentClass)

module.exports = router