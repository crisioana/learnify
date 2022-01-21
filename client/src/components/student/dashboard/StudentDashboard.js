import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineSearch } from 'react-icons/ai'
import { getStudentClasses } from './../../../redux/actions/classActions'
import { getDataAPI } from './../../../utils/fetchData'
import ClassCard from './../../global/ClassCard'
import Pagination from './../../global/Pagination'
import Loader from './../../global/Loader'

const StudentDashboard =  () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [noResult, setNoResult] = useState(false)
  const [sort, setSort] = useState('ascending')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, alert, studentClass } = useSelector(state => state)

  const handlePaginate = num => {
    fetchStudentClass(num)
  }

  const fetchStudentClass = useCallback(async(page = 1) => {
    await dispatch(getStudentClasses(auth.accessToken, page, sort))
  }, [dispatch, auth.accessToken, sort])

  useEffect(() => {
    fetchStudentClass()
  }, [fetchStudentClass])

  useEffect(() => {
    if (!search) {
      setNoResult(false)
      return setSearchResult([])
    }

    if (search.length > 3) {
      getDataAPI(`class/search/student?title=${search}`, auth.accessToken)
        .then(res => {
          if (!res.data.classes.length) {
            setNoResult(true)
          } else {
            setSearchResult(res.data.classes)
            setNoResult(false)
          }
        })
    }
  }, [search, auth.accessToken])

  return (
    <div className='studentDashboard'>
      <div className="studentDashboard__header">
        <div className='studentDashboard__search'>
          <div className='studentDashboard__searchInput'>
            <input type='text' placeholder='Search class ...' value={search} onChange={e => setSearch(e.target.value)} />
            <AiOutlineSearch />
          </div>
          <div className='studentDashboard__searchResult'>
            {
              noResult
              ? (
                <div className='studentDashboard__searchResult--blank'>
                  No Class Found
                </div>
              )
              : (
                <>
                  {
                    searchResult.map(item => (
                      <div key={item._id} className='studentDashboard__searchResult--item'>
                        {item.name}
                        <p onClick={() => navigate(`/class/${item._id}`)}>Expand</p>
                      </div>
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
        <div className='studentDashboard__filter'>
          <div className='studentDashboard__filter--btn' onClick={() => setIsOpenFilter(!isOpenFilter)}>
            <FaFilter />
            <p>Filter</p>
          </div>
          <div className={`studentDashboard__filter--dropdown ${isOpenFilter ? 'active' : undefined}`}>
            <div onClick={() => setSort('ascending')}>
              <AiOutlineSortDescending />
              Oldest to newest
            </div>
            <div onClick={() => setSort('descending')}>
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
      {
        studentClass.totalPage > 1 &&
        <>
          <div className='float-right'>
            <Pagination
              page={studentClass.totalPage}
              callback={handlePaginate}
            />
          </div>
          <div className="clear"></div>
        </>
      }
    </div>
  )
}

export default StudentDashboard