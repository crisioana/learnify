import { useState } from 'react'
import ClassDetailModal from './../teacher/dashboard/ClassDetailModal'

const ClassCard = ({id, isTeacher, title, description, instructor, totalQuiz, totalStudent}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <div className='classCard'>
        <h2>{title}</h2>
        <p>{description}</p>

        {
          isTeacher
          ? (
            <div className='classCard__teacherInfo'>
              <p>Total Quiz : {totalQuiz}</p>
              <p>Total Student : {totalStudent}</p>
            </div>
          )
          : <p>Instructor: {instructor}</p>
        }
        
        {
          isTeacher
          ? <button onClick={() => setIsOpenModal(true)}>More &gt;</button>
          : <button>Expand</button>
        }
      </div>

      {
        isTeacher &&
        <ClassDetailModal
          id={id}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      }
    </>
  )
}

export default ClassCard