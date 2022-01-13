import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineSearch } from 'react-icons/ai'
import { getStudentClasses } from './../../../redux/actions/classActions'
import ClassCard from './../../global/ClassCard'
import Loader from './../../global/Loader'

const StudentDashboard =  () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const dispatch = useDispatch()
  const { auth, alert, studentClass } = useSelector(state => state)

  useEffect(() => {
    dispatch(getStudentClasses(auth.accessToken))
  }, [dispatch, auth.accessToken])

  return (
    <div className='studentDashboard'>
      <div className="studentDashboard__header">
        <div className='studentDashboard__search'>
          <input type='text' placeholder='Search class ...' />
          <AiOutlineSearch />
        </div>
        <div className='studentDashboard__filter'>
          <div className='studentDashboard__filter--btn' onClick={() => setIsOpenFilter(!isOpenFilter)}>
            <FaFilter />
            <p>Filter</p>
          </div>
          <div className={`studentDashboard__filter--dropdown ${isOpenFilter ? 'active' : undefined}`}>
            <div>
              <AiOutlineSortDescending />
              Oldest to newest
            </div>
            <div>
              <AiOutlineSortAscending />
              Newest to oldest
            </div>
          </div>
        </div>
      </div>
      <div className="studentDashboard__body">
        {
          alert.loading
          ? (
            <div className='center'>
              <Loader width='40px' height='40px' border='4px' />
            </div>
          )
          : (
            <>
              {
                studentClass.data?.map(item => (
                  <ClassCard
                    key={item._id}
                    id={item._id}
                    title={item.name}
                    description={item.description}
                    instructor={item.instructor.name}
                  />
                ))
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default StudentDashboard