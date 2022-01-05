import { AiOutlineSearch } from 'react-icons/ai'
import PeopleCard from './PeopleCard'

const PeopleList = () => {
  return (
    <div>
      <div className='searchInput'>
        <input type='text' placeholder='Search people ...' />
        <AiOutlineSearch />
      </div>
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
      <PeopleCard />
    </div>
  )
}

export default PeopleList