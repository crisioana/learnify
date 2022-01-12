import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

const QuizCard = ({id, title, status}) => {
  const [isOpen, setIsOpen] = useState(true)

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit_quiz/${id}`)
  }

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
        <FaEdit onClick={handleEdit} />
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