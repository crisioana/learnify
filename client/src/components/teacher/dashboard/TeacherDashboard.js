import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserGraduate } from 'react-icons/fa'
import { SiGoogleclassroom } from 'react-icons/si'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiOpenBook } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'
import { getClasses } from './../../../redux/actions/classActions'
import { getDataAPI } from './../../../utils/fetchData'
import InfoCard from './../../global/InfoCard'
import ClassCard from './../../global/ClassCard'
import ClassDetailModal from './ClassDetailModal'
import Loader from './../../global/Loader'

const TeacherDashboard = () => {
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [selectedClass, setSelectedClass] = useState({})
  const [isOpenModal, setIsOpenModal] = useState(false)

  const dispatch = useDispatch()
  const { auth, alert, instructorClass } = useSelector(state => state)
  
  const handleOpenDetail = item => {
    setSelectedClass(item)
    setIsOpenModal(true)
  }

  useEffect(() => {
    if (!search) return setSearchData([])
    
    if (search.length > 3) {
      getDataAPI(`class/search/instructor/${auth.user?._id}?title=${search}`)
        .then(res => setSearchData(res.data.classes))
        .catch(err => setSearchData([]))
    }
  }, [search, auth.user?._id])

  useEffect(() => {
    dispatch(getClasses(auth.accessToken))
  }, [dispatch, auth])

  return (
    <>
      <div className='teacherDashboard'>
        <div className='teacherDashboard__header'>
          <InfoCard
            title='Total Students'
            description='40 Students'
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
            Icon={GiOpenBook}
          />
          <InfoCard
            title='Total Quiz Close'
            description='2 Quiz'
            Icon={ImBook}
          />
        </div>
        <div className='teacherDashboard__body'>
          <div className="teacherDashboard__body--title">
            <h2>Your Classes</h2>
            <div className='teacherDashboard__body--search'>
              <div className='teacherDashboard__body--searchInput'>
                <input type='text' placeholder='Search class ...' value={search} onChange={e => setSearch(e.target.value)} />
                <AiOutlineSearch />
              </div>
              <div className='teacherDashboard__body--searchResult'>
                {
                  searchData.map(item => (
                    <div className='teacherDashboard__body--searchData'>
                      {item.name}
                      <p onClick={() => handleOpenDetail(item)}>Detail</p>
                    </div>
                  ))
                }
              </div>
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
                            quizzes={item.quizzes}
                            student={item.people}
                            classRestrict={item.restrict}
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

      <ClassDetailModal
        id={selectedClass._id}
        title={selectedClass.name}
        quizzes={selectedClass.quizzes}
        student={selectedClass.student}
        classRestrict={selectedClass.restrict}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  )
}

export default TeacherDashboard