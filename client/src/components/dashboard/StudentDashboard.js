import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineSearch } from 'react-icons/ai'

const StudentDashboard =  () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

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
      <div className="studentDashbaord__body">
        
      </div>
    </div>
  )
}

export default StudentDashboard