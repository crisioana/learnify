import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineSearch } from 'react-icons/ai'
import ClassCard from './ClassCard'

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
      <div className="studentDashboard__body">
        <ClassCard
          title='Test Class Name'
          description='Class description goes here. tralalal lorem ipsum dolor sit amet.'
          instructor='Lecturer Name'
        />
        <ClassCard
          title='Test Class Name'
          description='Class description goes here. tralalal lorem ipsum dolor sit amet.'
          instructor='Lecturer Name'
        />
        <ClassCard
          title='Test Class Name'
          description='Class description goes here. tralalal lorem ipsum dolor sit amet.'
          instructor='Lecturer Name'
        />
      </div>
    </div>
  )
}

export default StudentDashboard