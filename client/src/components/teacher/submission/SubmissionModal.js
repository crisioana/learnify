import { AiOutlineClose } from 'react-icons/ai'
import SubmissionCard from './SubmissionCard'

const SubmissionModal = ({title, viewSubmission, setViewSubmission}) => {
  return (
    <div className={`submissionModal ${viewSubmission ? 'active' : undefined}`}>
      <div className={`submissionModal__box ${viewSubmission ? 'active' : undefined}`}>
        <div className='submissionModal__header'>
          <h3>{title} Submission</h3>
          <AiOutlineClose onClick={() => setViewSubmission(false)} />
        </div>
        <div className='submissionModal__body'>
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
        </div>
      </div>
    </div>
  )
}

export default SubmissionModal