import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { getDataAPI } from './../../utils/fetchData'
import Navbar from './../../components/global/Navbar'
import FilterSearch from './../../components/student/classDetail/FilterSearch'
import QuizCard from './../../components/student/classDetail/QuizCard'
import Loader from './../../components/global/Loader'

const ClassDetail = () => {
  const [loading, setLoading] = useState(false)
  const [sortByDate, setSortByDate] = useState('')
  const [filterByCompletion, setFilterByCompletion] = useState('')
  const [classData, setClassData] = useState({})

  const { id } = useParams()
  const { auth } = useSelector(state => state)

  const fetchClassDetailData = useCallback(async() => {
    setLoading(true)
    let url = `class/${id}`
    
    if (sortByDate === 'descending')
      url = url + '?sort=descending'

    const res = await getDataAPI(url)
    const tempQuizzes = res.data.class[0].quizzes
    let newQuizzes = []

    if (filterByCompletion === 'complete') {
      tempQuizzes.forEach(item => {
        item.results.forEach(result => {
          if (result.student === auth.user?._id) {
            newQuizzes.push(item)
          }
        })
      })
    } else if (filterByCompletion === 'incomplete') {
      tempQuizzes.forEach(item => {
        let isMatch = false
        
        if (item.results.length > 0) {
          item.results.forEach(result => {
            if (result.student !== auth.user?._id) {
              isMatch = true
            } else {
              isMatch = false
            }
          })
        } else {
          isMatch = true
        }

        if (isMatch)
          newQuizzes.push(item)
      })
    } else {
      newQuizzes = tempQuizzes
    }

    setClassData({
      ...res.data.class[0],
      quizzes: newQuizzes
    })

    setLoading(false)
  }, [id, sortByDate, filterByCompletion, auth.user?._id])

  useEffect(() => {
    if (!id) return
    fetchClassDetailData()
  }, [id, fetchClassDetailData])

  return (
    <>
      <Navbar />
      <div className='classDetail container'>
        <div className='classDetail__header'>
          <h2>{classData.name}</h2>
          <p>Instructor : {classData.instructor?.name}</p>
        </div>
        <div className='classDetail__body'>
          <div className='classDetail__body--header'>
            <FilterSearch
              sortByDate={sortByDate}
              filterByCompletion={filterByCompletion}
              setSortByDate={setSortByDate}
              setFilterByCompletion={setFilterByCompletion}
            />
          </div>
          <div className='classDetail__body--body'>
            <div className='classDetail__input'>
              <input type='text' placeholder='Search quiz ...' autoComplete='off' />
              <AiOutlineSearch />
            </div>
            <div className='classDetail__quizList'>
              {
                loading
                ? (
                  <div className='center'>
                    <Loader width='50px' height='50px' border='5px' />
                  </div>
                )
                : (
                  <>
                    {
                      classData.quizzes?.length === 0
                      ? (
                        <div className='errorMessage'>
                          No quiz found within this class
                        </div>
                      )
                      : (
                        <>
                          {
                            classData.quizzes?.map(quiz => (
                              <QuizCard
                                key={quiz._id}
                                id={quiz._id}
                                title={quiz.title}
                                isDone={quiz.results?.find(item => item.student === auth.user?._id)}
                              />
                            ))
                          }
                        </>
                      )
                    }
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassDetail