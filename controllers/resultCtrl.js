const Result = require('./../models/Result')

const resultCtrl = {
  getResultByQuiz: async(req, res) => {
    try {
      const quizzes = await Result.find({quiz: req.params.id})
      return res.status(200).json({quizzes})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = resultCtrl