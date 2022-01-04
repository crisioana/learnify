import { Link } from 'react-router-dom'

const QuizCard = () => {
  return (
    <div className='quizCard'>
      <div className='quizCard__left'>
        <h4><Link to='/'>Test Quiz Title</Link></h4>
      </div>
      <div className='quizCard__right'>
        <p>View Grade</p>
        <p>90/90</p>
        <p>Not done</p>
      </div>
    </div>
  )
}

export default QuizCard