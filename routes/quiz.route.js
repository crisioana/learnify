const router = require('express').Router()
const quizCtrl = require('./../controllers/quizCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/').post(isAuthenticated, authorizeRoles('Instructor'), quizCtrl.createQuiz)

router.route('/:id')
  .get(quizCtrl.getQuizById)
  .patch(isAuthenticated, authorizeRoles('Instructor'), quizCtrl.udpateQuiz)

module.exports = router