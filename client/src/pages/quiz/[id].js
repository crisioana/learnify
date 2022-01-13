import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizDetail } from './../../redux/actions/quizActions'
import Navbar from './../../components/global/Navbar'
import QuestionBox from './../../components/global/QuestionBox'
import Loader from './../../components/global/Loader'

const QuizDetail = () => {
  const [studentAnswer, setStudentAnswer] = useState({})

  const dispatch = useDispatch()
  const { id } = useParams()
  const { alert, quizDetail } = useSelector(state => state)
  
  const handleChangeAnswer = (questionIdx, value) => {
    setStudentAnswer({...studentAnswer, [questionIdx]: value})
  }

  useEffect(() => {
    dispatch(getQuizDetail(id))
  }, [id, dispatch])
  
  return (
    <>
      <Navbar />
      <div className='quizDetail container'>
        {
          alert.loading
          ? (
            <div className='center'>
              <Loader width='50px' height='50px' border='5px' />
            </div>
          )
          : (
            <>
              <div className='quizDetail__header'>
                <h2>{quizDetail.class?.name} | {quizDetail.title}</h2>
                <p>Instructor : {quizDetail.class?.instructor.name}</p>
                <p>{quizDetail.questions?.length} {quizDetail.questions?.length > 1 ? 'Questions' : 'Question'}</p>
              </div>
              <div className='quizDetail__body'>
                {
                  quizDetail.questions?.map((question, idx) => (
                    <div key={question._id} className='quizDetail__question'>
                      <h3>Question {idx + 1}</h3>
                      <QuestionBox questionIdx={idx} title={question.title} choice={question.choice} cb={handleChangeAnswer} />
                    </div>
                  ))
                }
              </div>
            </>
          )
        }

        {!alert.loading && <button>Submit</button>}
        <div className="clear"></div>
      </div>
    </>
  )
}

export default QuizDetail