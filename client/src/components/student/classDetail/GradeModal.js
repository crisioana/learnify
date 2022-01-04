import { AiOutlineClose } from 'react-icons/ai'
import QuestionBox from './../../global/QuestionBox'

const GradeModal = ({isOpenGrade, setIsOpenGrade}) => {
  return (
    <div className={`gradeModal ${isOpenGrade ? 'active' : undefined}`}>
      <div className={`gradeModal__box ${isOpenGrade ? 'active' : undefined}`}>
        <div className='gradeModal__header'>
          <h3>Test Quiz Grade</h3>
          <AiOutlineClose onClick={() => setIsOpenGrade(false)} />
        </div>
        <div className='gradeModal__body'>
          <h4>Grade: 80/90</h4>
          <div className="gradeModal__question">
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className="gradeModal__question">
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className="gradeModal__question">
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
          <div className="gradeModal__question">
            <h3>Question 1</h3>
            <QuestionBox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradeModal