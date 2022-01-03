import { FaFilter } from 'react-icons/fa'

const StudentDashboard =  () => {
  return (
    <div className='studentDashboard'>
      <div className="studentDashboard__header">
        <input type='text' placeholder='Search class ...' />
        <div className='studentDashboard__filter'>
          <div className='studentDashboard__filter--btn'>
            <FaFilter />
            <p>Filter</p>
          </div>
          <div className="studentDashboard__filter--dropdown">
            <div>
              Oldest to newest
            </div>
            <div>
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