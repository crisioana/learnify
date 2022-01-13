import { useState } from 'react'
import { Link } from 'react-router-dom'
import GradeModal from './../../global/GradeModal'

const QuizCard = ({title}) => {
  const [isOpenGrade, setIsOpenGrade] = useState(false)

  return (
    <>
      <div className='quizCard'>
        <div className='quizCard__left'>
          <h4><Link to='/'>{title}</Link></h4>
        </div>
        <div className='quizCard__right'>
          <p onClick={() => setIsOpenGrade(true)}>View Grade</p>
          <p>90/90</p>
          <p>Not done</p>
        </div>
      </div>

      <GradeModal
        isOpenGrade={isOpenGrade}
        setIsOpenGrade={setIsOpenGrade}
      />
    </>
  )
}

export default QuizCard