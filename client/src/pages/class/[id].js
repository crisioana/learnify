import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiCheckDouble } from 'react-icons/bi'
import { MdOutlinePendingActions } from 'react-icons/md'
import Navbar from './../../components/global/Navbar'

const ClassDetail = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  return (
    <>
      <Navbar />
      <div className='classDetail container'>
        <div className='classDetail__header'>
          <h2>Class Name Goes Here</h2>
          <p>Instructor : Lecturer Name</p>
        </div>
        <div className='classDetail__body'>
          <div className='classDetail__body--header'>
            <div className='classDetail__filter'>
              <div className='classDetail__filter--btn' onClick={() => setIsOpenFilter(true)}>
                <FaFilter />
                <p>Filter</p>
              </div>
              <div className={`classDetail__filter--overlay ${isOpenFilter ? 'active' : undefined}`}>
                <div className={`classDetail__filter--sidebar ${isOpenFilter ? 'active' : undefined}`}>
                  <div className='classDetail__filter--close'>
                    <AiOutlineClose onClick={() => setIsOpenFilter(false)} />
                  </div>
                  <div className='classDetail__filter--single'>
                    <h4>Filter By Category</h4>
                    <div className='inputGroup'>
                      <input type='checkbox' id='geography' />
                      <label htmlFor='geography'>Geography</label>
                    </div>
                    <div className='inputGroup'>
                      <input type='checkbox' id='geography' />
                      <label htmlFor='geography'>Geography</label>
                    </div>
                    <div className='inputGroup'>
                      <input type='checkbox' id='geography' />
                      <label htmlFor='geography'>Geography</label>
                    </div>
                    <div className='inputGroup'>
                      <input type='checkbox' id='geography' />
                      <label htmlFor='geography'>Geography</label>
                    </div>
                    <div className='inputGroup'>
                      <input type='checkbox' id='geography' />
                      <label htmlFor='geography'>Geography</label>
                    </div>
                  </div>
                  <div className='classDetail__filter--single'>
                    <h4>Sort By Date</h4>
                    <div className='classDetail__filter--noInput'>
                      <AiOutlineSortDescending />
                      <p>Oldest to newest</p>
                    </div>
                    <div className='classDetail__filter--noInput'>
                      <AiOutlineSortAscending />
                      <p>Newest to oldest</p>
                    </div>
                  </div>
                  <div className='classDetail__filter--single'>
                    <h4>Filter By Completion</h4>
                    <div className='classDetail__filter--noInput'>
                      <BiCheckDouble />
                      <p>Completed Quiz</p>
                    </div>
                    <div className='classDetail__filter--noInput'>
                      <MdOutlinePendingActions />
                      <p>Incompleted Quiz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='classDetail__input'>
              <input type='text' placeholder='Search quiz ...' autoComplete='off' />
              <AiOutlineSearch />
            </div>
          </div>
          <div className='classDetail__body--body'>

          </div>
        </div>
      </div>
    </>
  )
}

export default ClassDetail