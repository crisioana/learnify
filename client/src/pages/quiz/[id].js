import Navbar from './../../components/global/Navbar'
import QuestionBox from './../../components/global/QuestionBox'

const QuizDetail = () => {
  return (
    <>
      <Navbar />
      <div className='quizDetail container'>
        <div className='quizDetail__header'>
          <h2>Class Name Goes Here | Quiz Title Goes Here</h2>
          <p>Instructor : Mr. Instructor</p>
          <p>40 Questions</p>
        </div>
        <div className='quizDetail__body'>
          <div className='quizDetail__question'>
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className='quizDetail__question'>
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className='quizDetail__question'>
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className='quizDetail__question'>
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizDetail