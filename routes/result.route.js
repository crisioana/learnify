const router = require('express').Router()
const resultCtrl = require('./../controllers/resultCtrl')
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth')

router.route('/quiz/:id').get(isAuthenticated, authorizeRoles('Instructor'), resultCtrl.getResultByQuiz)

module.exports = router