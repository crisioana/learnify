import { useSelector } from 'react-redux'
import StudentDashboard from './../components/student/dashboard/StudentDashboard'
import TeacherDashboard from './../components/teacher/dashboard/TeacherDashboard'
import Navbar from './../components/global/Navbar'

const Dashboard = () => {
  const { auth } = useSelector(state => state)

  return (
    <>
      <Navbar />
      <div className='container'>
        {
          auth.user?.role === 'Student' &&
          <StudentDashboard />
        }

        {
          auth.user?.role === 'Instructor' &&
          <TeacherDashboard />
        }
      </div>
    </>
  )
}

export default Dashboard