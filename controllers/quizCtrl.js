const Quiz = require('./../models/Quiz')

const quizCtrl = {
  createQuiz: async(req, res) => {
    try {
      const { classId, title, questions } = req.body
      if (!title || questions.length === 0)
        return res.status(400).json({msg: 'Please provide every field.'})

      const newQuiz = new Quiz({
        title,
        class: classId,
        questions
      })
      await newQuiz.save()

      return res.status(200).json({msg: `Quiz with title ${title} has been created.`})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = quizCtrl