import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiCheckDouble } from 'react-icons/bi'
import { MdOutlinePendingActions } from 'react-icons/md'

const FilterSearch = ({category, sortByDate, filterByCompletion, setSortByDate, setFilterByCompletion}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleSortByDate = type => {
    if (sortByDate === type) {
      setSortByDate('')
    } else {
      setSortByDate(type)
    }
  }

  const handleFilterByCompletion = type => {
    if (filterByCompletion === type) {
      setFilterByCompletion('')
    } else {
      setFilterByCompletion(type)
    }
  }

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
              {
                category.map(item => (
                  <div className='inputGroup' key={item._id}>
                    <input type='checkbox' id={item.name} value={item._id} />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                ))
              }
            </div>
            <div className='filterSearch--single'>
              <h4>Sort By Date</h4>
              <div className={`filterSearch--noInput ${sortByDate === 'ascending' ? 'sort-active' : undefined}`} onClick={() => handleSortByDate('ascending')}>
                <AiOutlineSortDescending />
                <p>Oldest to newest</p>
              </div>
              <div className={`filterSearch--noInput ${sortByDate === 'descending' ? 'sort-active' : undefined}`} onClick={() => handleSortByDate('descending')}>
                <AiOutlineSortAscending />
                <p>Newest to oldest</p>
              </div>
            </div>
            <div className='filterSearch--single'>
              <h4>Filter By Completion</h4>
              <div className={`filterSearch--noInput ${filterByCompletion === 'complete' ? 'filter-active' : undefined}`} onClick={() => handleFilterByCompletion('complete')}>
                <BiCheckDouble />
                <p>Completed Quiz</p>
              </div>
              <div className={`filterSearch--noInput ${filterByCompletion === 'incomplete' ? 'filter-active' : undefined}`} onClick={() => handleFilterByCompletion('incomplete')}>
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