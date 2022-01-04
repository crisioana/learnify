import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiCheckDouble } from 'react-icons/bi'
import { MdOutlinePendingActions } from 'react-icons/md'

const FilterSearch = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  return (
    <>
      <div className='filterSearch'>
        <div className='filterSearch--btn' onClick={() => setIsOpenFilter(true)}>
          <FaFilter />
          <p>Filter</p>
        </div>
        <div className={`filterSearch--overlay ${isOpenFilter ? 'active' : undefined}`}>
          <div className={`filterSearch--sidebar ${isOpenFilter ? 'active' : undefined}`}>
            <div className='filterSearch--close'>
              <AiOutlineClose onClick={() => setIsOpenFilter(false)} />
            </div>
            <div className='filterSearch--single'>
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
            <div className='filterSearch--single'>
              <h4>Sort By Date</h4>
              <div className='filterSearch--noInput'>
                <AiOutlineSortDescending />
                <p>Oldest to newest</p>
              </div>
              <div className='filterSearch--noInput'>
                <AiOutlineSortAscending />
                <p>Newest to oldest</p>
              </div>
            </div>
            <div className='filterSearch--single'>
              <h4>Filter By Completion</h4>
              <div className='filterSearch--noInput'>
                <BiCheckDouble />
                <p>Completed Quiz</p>
              </div>
              <div className='filterSearch--noInput'>
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
    </>
  )
}

export default FilterSearch