import { AiOutlineSearch } from 'react-icons/ai'
import Navbar from './../../components/global/Navbar'
import FilterSearch from './../../components/classDetail/FilterSearch'

const ClassDetail = () => {
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
            <FilterSearch />
          </div>
          <div className='classDetail__body--body'>
            <div className='classDetail__input'>
              <input type='text' placeholder='Search quiz ...' autoComplete='off' />
              <AiOutlineSearch />
            </div>
            all available class quiz will goes here
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassDetail