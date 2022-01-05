import { useState } from 'react'
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

const QuizCard = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='teacherQuizCard'>
      <div className='teacherQuizCard__left'>
        <h4>Quiz title goes here</h4>
      </div>
      <div className='teacherQuizCard__right'>
        <FaEye />
        <FaEdit />
        <FaTrash />
        <p
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? 'open' : 'close'}
        >
          {isOpen ? 'Open' : 'Close'}
        </p>
      </div>
    </div>
  )
}

export default QuizCard