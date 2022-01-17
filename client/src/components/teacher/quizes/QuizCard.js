import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'
import { changeQuizStatus, deleteQuiz } from './../../../redux/actions/quizActions'

const QuizCard = ({id, title, status}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(state => state)

  const handleEdit = () => {
    navigate(`/edit_quiz/${id}`)
  }

  const handleChangeStatus = () => {
    let newStatus = ''
    if (status === 'Open') {
      newStatus = 'Close'
    } else {
      newStatus = 'Open'
    }
    dispatch(changeQuizStatus(id, newStatus, auth.accessToken))
  }

  const handleDelete = () => {
    dispatch(deleteQuiz(id, auth.accessToken))
  }

  return (
    <div className='teacherQuizCard'>
      <div className='teacherQuizCard__left'>
        <h4>{title}</h4>
      </div>
      <div className='teacherQuizCard__right'>
        <FaEye />
        <FaEdit onClick={handleEdit} />
        <FaTrash onClick={handleDelete} />
        <p
          onClick={handleChangeStatus}
          className={status === 'Open' ? 'open' : 'close'}
        >
          {status === 'Open' ? 'Open' : 'Close'}
        </p>
      </div>
    </div>
  )
}

export default QuizCard