import { useParams } from 'react-router-dom'
import CreateQuiz from './../create_quiz/[id]'

const EditQuiz = () => {
  const { id } = useParams()

  return (
    <CreateQuiz
      quizId={id}
      onEdit={true}
    />
  )
}

export default EditQuiz