import { AiOutlineSearch } from 'react-icons/ai'
import PeopleCard from './PeopleCard'

const PeopleList = ({student}) => {
  return (
    <div>
      <div className='searchInput'>
        <input type='text' placeholder='Search people ...' />
        <AiOutlineSearch />
      </div>
      {
        student.length === 0
        ? (
          <div className='errorMessage'>
            No People Found
          </div>
        )
        : (
          <>
            {
              student.map(item => (
                <PeopleCard
                  avatar={item.avatar}
                  name={item.name}
                  email={item.email}
                />
              ))
            }
          </>
        )
      }
    </div>
  )
}

export default PeopleList