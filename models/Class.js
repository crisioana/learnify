const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  restrict: {
    type: Boolean,
    default: false
  },
  quizzes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'quiz'
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('class', classSchema)