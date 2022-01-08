import { FaUserGraduate } from 'react-icons/fa'
import { SiGoogleclassroom } from 'react-icons/si'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiOpenBook } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'
import InfoCard from './../../global/InfoCard'
import ClassCard from './../../global/ClassCard'

const TeacherDashboard = () => {
  return (
    <div className='teacherDashboard'>
      <div className='teacherDashboard__header'>
        <InfoCard
          title='Total Students'
          description='40 Students'
          color='violet'
          Icon={FaUserGraduate}
        />
        <InfoCard
          title='Total Class'
          description='3 Classes'
          Icon={SiGoogleclassroom}
        />
        <InfoCard
          title='Total Quiz Open'
          description='4 Quiz'
          color='green'
          Icon={GiOpenBook}
        />
        <InfoCard
          title='Total Quiz Close'
          description='2 Quiz'
          color='red'
          Icon={ImBook}
        />
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