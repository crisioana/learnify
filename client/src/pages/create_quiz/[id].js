import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { createQuiz } from './../../redux/actions/quizActions'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import Navbar from './../../components/global/Navbar'
import Loader from './../../components/global/Loader'

const CreateQuiz = () => {
  const [title, setTitle] = useState('Title Goes Here')
  const [questions, setQuestions] = useState([
    {
      title: 'Question Goes Here',
      answer: 0,
      choice: ['Choice Goes Here']
    }
  ])

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth, alert } = useSelector(state => state)

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: 'Question Goes Here',
        answer: 0,
        choice: ['Choice Goes Here']
      }
    ])
  }

  const handleDeleteQuestion = idxQuestion => {
    const newQuestions = [...questions];
    newQuestions.splice(idxQuestion, 1)
    setQuestions(newQuestions)
  }

  const handleDeleteChoice = (idxChoice, idxQuestion) => {
    const getQuestion = questions[idxQuestion]
    getQuestion.choice.splice(idxChoice, 1)
    setQuestions(
      questions.map((question, i) => i === idxQuestion ? getQuestion : question)
    )
  }

  const handleChangeQuestion = (e, idxQuestion) => {
    const value = e.target.value
    const getQuestion = questions[idxQuestion]
    getQuestion.title = value
    setQuestions(
      questions.map((question, i) => i === idxQuestion ? getQuestion : question)
    )
  }

  const handleAddChoice = idxQuestion => {
    const getQuestion = questions[idxQuestion]
    getQuestion.choice.push('Choice Goes Here')
    setQuestions(
      questions.map((question, i) => i === idxQuestion ? getQuestion : question)
    )
  }

  const handleChangeChoice = (e, idxChoice, idxQuestion) => {
    const value = e.target.value
    const getQuestion = questions[idxQuestion]
    getQuestion.choice[idxChoice] = value;
    setQuestions(
      questions.map((question, i) => i === idxQuestion ? getQuestion : question)
    )
  }

  const handleChangeAnswer = (e, idxQuestion) => {
    const value = e.target.value
    const getQuestion = questions[idxQuestion]
    getQuestion.answer = value
    setQuestions(
      questions.map((question, i) => i === idxQuestion ? getQuestion : question)
    )
  }

  const handleSubmit = async() => {
    if (!title) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Title field can\'t be empty.'
        }
      })
    }

    if (questions.length === 0) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Question can\'t be blank'
        }
      })
    }
    
    const quizData = {
      classId: id,
      title,
      questions
    }

    await dispatch(createQuiz(quizData, auth.accessToken))
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className='container createQuiz'>
        <div className='createQuiz__header'>
          <h2>Create Quiz for "Class Title Goes Here" Class</h2>
          <p>Instructor : Lecturer Name Goes Here</p>
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='createQuiz__body'>
          {
            questions.map((question, idxQuestion) => (
              <div className='createQuiz__question' key={idxQuestion}>
                <div className='createQuiz__question--title'>
                  <h3>Question {idxQuestion + 1}</h3>
                  <FaTrash onClick={() => handleDeleteQuestion(idxQuestion)} />
                </div>
                <textarea value={question.title} onChange={e => handleChangeQuestion(e, idxQuestion)} />
                {
                  question.choice.map((choice, idxChoice) => (
                    <div className='createQuiz__choice' key={idxChoice}>
                      <input type='radio' id={choice} disabled={true} />
                      <input type='text' value={choice} onChange={e => handleChangeChoice(e, idxChoice, idxQuestion)} />
                      <FaTrash onClick={() => handleDeleteChoice(idxChoice, idxQuestion)} />
                    </div>
                  ))
                }
                <button onClick={() => handleAddChoice(idxQuestion)}>Add Choice</button>
                <div className='createQuiz__answer'>
                  <p>Answer</p>
                  <select onChange={e => handleChangeAnswer(e, idxQuestion)}>
                    {
                      question.choice.map((choice, idxChoice) => (
                        <option key={idxChoice} value={idxChoice}>{choice}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            ))
          }
          <div className='createQuiz__bottomBtn'>
            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={handleSubmit} disabled={alert.loading ? true : false}>
              {
                alert.loading
                ? (
                  <div className='center'>
                    <Loader width='20px' height='20px' border='2px' />
                  </div>
                )
                : 'Submit'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateQuiz