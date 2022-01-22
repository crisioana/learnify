import QuizCard from './QuizCard'

const QuizList = ({quizzes}) => {
  return (
    <div>
      {
        quizzes?.length === 0
        ? (
          <div className='errorMessage'>
            No Quiz Found
          </div>
        )
        : (
          <>
            {
              quizzes?.map(quiz => (
                <QuizCard
                  key={quiz._id}
                  id={quiz._id}
                  title={quiz.title}
                  status={quiz.status}
                  submissions={quiz.results}
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