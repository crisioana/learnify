import { AiOutlineSearch } from 'react-icons/ai'
import InfoCard from './../../global/InfoCard'
import ClassCard from './../../global/ClassCard'

const TeacherDashboard = () => {
  return (
    <div className='teacherDashboard'>
      <div className='teacherDashboard__header'>
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
      <div className='teacherDashboard__body'>
        <div className="teacherDashboard__body--title">
          <h2>Your Classes</h2>
          <div>
            <input type='text' placeholder='Search class ...' />
            <AiOutlineSearch />
          </div>
        </div>
        <div className='teacherDashboard__classList'>
          <ClassCard
            isTeacher={true}
            title='Class Title Goes Here'
            description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
            totalQuiz={5}
            totalStudent={7}
          />
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard