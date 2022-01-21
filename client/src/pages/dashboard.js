import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudentDashboard from './../components/student/dashboard/StudentDashboard'
import TeacherDashboard from './../components/teacher/dashboard/TeacherDashboard'
import Navbar from './../components/global/Navbar'

const Dashboard = () => {
  const navigate = useNavigate()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    if (!auth.user)
      navigate('/')
  }, [auth.user, navigate])

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