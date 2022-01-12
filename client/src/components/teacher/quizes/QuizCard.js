import { useState, useEffect } from 'react'
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

const QuizCard = ({id, title, status}) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (status === 'Open') {
      setIsOpen(true)
    }

    return () => setIsOpen(false)
  }, [status])

  return (
    <div className='teacherQuizCard'>
      <div className='teacherQuizCard__left'>
        <h4>{title}</h4>
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