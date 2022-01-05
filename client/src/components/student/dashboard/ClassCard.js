import ClassDetailModal from './../../teacher/dashboard/ClassDetailModal'

const ClassCard = ({isTeacher, title, description, instructor, totalQuiz, totalStudent}) => {
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
          ? <button>More &gt;</button>
          : <button>Expand</button>
        }
      </div>

      {
        isTeacher &&
        <ClassDetailModal />
      }
    </>
  )
}

export default ClassCard