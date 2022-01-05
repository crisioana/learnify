// import StudentDashboard from './../components/student/dashboard/StudentDashboard'
import TeacherDashboard from './../components/teacher/dashboard/TeacherDashboard'
import Navbar from './../components/global/Navbar'

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <TeacherDashboard />
      </div>
    </>
  )
}

export default Dashboard