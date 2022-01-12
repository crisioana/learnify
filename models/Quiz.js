const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Types.ObjectId,
    ref: 'class'
  },
  questions: [
    {
      title: {
        type: String,
        required: true
      },
      choice: {
        type: Array,
        required: true
      },
      answer: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    default: 'Open'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('quiz', quizSchema)