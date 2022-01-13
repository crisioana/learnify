import { useState, useEffect, useCallback } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { getDataAPI } from './../../utils/fetchData'
import Navbar from './../../components/global/Navbar'
import FilterSearch from './../../components/student/classDetail/FilterSearch'
import QuizCard from './../../components/student/classDetail/QuizCard'
import Loader from './../../components/global/Loader'

const ClassDetail = () => {
  const [loading, setLoading] = useState(false)
  const [classData, setClassData] = useState({})

  const { id } = useParams()

  const fetchClassDetailData = useCallback(async() => {
    setLoading(true)
    const res = await getDataAPI(`class/${id}`)
    console.log(res.data)
    setClassData(res.data.class)
    setLoading(false)
  }, [id])

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
            <FilterSearch />
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
                                title={quiz.title}
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