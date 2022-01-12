import { AiOutlineSearch } from 'react-icons/ai'
import QuizCard from './QuizCard'

const QuizList = ({quizzes}) => {
  return (
    <div>
      <div className='searchInput'>
        <input type='text' placeholder='Search quiz ...' />
        <AiOutlineSearch />
      </div>
      {
        quizzes.length === 0
        ? (
          <div className='errorMessage'>
            No Quiz Found
          </div>
        )
        : (
          <>
            {
              quizzes.map(quiz => (
                <QuizCard
                  key={quiz._id}
                  id={quiz._id}
                  title={quiz.title}
                  status={quiz.status}
                />
              ))
            }
          </>
        )
      }
    </div>
  )
}

export default QuizList