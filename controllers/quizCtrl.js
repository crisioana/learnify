const Quiz = require('./../models/Quiz')
const Class = require('./../models/Class')

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

      await Class.findOneAndUpdate({_id: classId}, {
        $push: { quizzes: newQuiz._id }
      })

      return res.status(200).json({
        msg: `Quiz with title ${title} has been created.`,
        quiz: newQuiz
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = quizCtrl