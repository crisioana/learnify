import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClassDetailModal from './../teacher/dashboard/ClassDetailModal'

const ClassCard = ({id, isTeacher, title, description, instructor, quizzes, student}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const navigate = useNavigate()
  
  const handleExpand = () => {
    navigate(`/class/${id}`)
  }

  return (
    <>
      <div className='classCard'>
        <h2>{title}</h2>
        <p>{description}</p>

        {
          isTeacher
          ? (
            <div className='classCard__teacherInfo'>
              <p>Total Quiz : {quizzes.length}</p>
              <p>Total Student : {student.length}</p>
            </div>
          )
          : <p>Instructor: {instructor}</p>
        }
        
        {
          isTeacher
          ? <button onClick={() => setIsOpenModal(true)}>More &gt;</button>
          : <button onClick={handleExpand}>Expand</button>
        }
      </div>

      {
        isTeacher &&
        <ClassDetailModal
          id={id}
          quizzes={quizzes}
          student={student}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      }
    </>
  )
}

export default ClassCard