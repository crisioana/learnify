import StudentDashboard from './../components/student/dashboard/StudentDashboard'
import Navbar from './../components/global/Navbar'

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <StudentDashboard />
      </div>
    </>
  )
}

export default Dashboard