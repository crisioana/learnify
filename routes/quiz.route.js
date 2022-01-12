const router = require('express').Router()
const quizCtrl = require('./../controllers/quizCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/').post(isAuthenticated, authorizeRoles('Instructor'), quizCtrl.createQuiz)

module.exports = router