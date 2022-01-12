import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserGraduate } from 'react-icons/fa'
import { SiGoogleclassroom } from 'react-icons/si'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiOpenBook } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'
import { getClasses } from './../../../redux/actions/classActions'
import InfoCard from './../../global/InfoCard'
import ClassCard from './../../global/ClassCard'
import Loader from './../../global/Loader'

const TeacherDashboard = () => {
  const dispatch = useDispatch()
  const { auth, alert, instructorClass } = useSelector(state => state)

  useEffect(() => {
    dispatch(getClasses(auth.accessToken))
  }, [dispatch, auth])

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
        {
          alert.loading
          ? (
            <div className='center mt-5'>
              <Loader width='60px' height='60px' />
            </div>
          )
          : (
            <>
              {
                instructorClass.data.length === 0
                ? (
                  <div className='errorMessage'>No Class Found</div>
                )
                : (
                  <div className='teacherDashboard__classList'>
                    {
                      instructorClass.data?.map(item => (
                        <ClassCard
                          key={item._id}
                          id={item._id}
                          isTeacher={true}
                          title={item.name}
                          description={item.description}
                          totalQuiz={5}
                          totalStudent={7}
                        />
                      ))
                    }
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default TeacherDashboard