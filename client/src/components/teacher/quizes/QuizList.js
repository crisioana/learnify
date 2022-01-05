import { AiOutlineSearch } from 'react-icons/ai'
import QuizCard from './QuizCard'

const QuizList = () => {
  return (
    <div>
      <div className='searchInput'>
        <input type='text' placeholder='Search quiz ...' />
        <AiOutlineSearch />
      </div>
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
    </div>
  )
}

export default QuizList