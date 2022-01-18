import { SUBMISSION_TYPES } from './../types/submissionTypes'

const submissionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMISSION_TYPES.GET_SUBMISSIONS_BY_QUIZ:
      return action.payload
    default:
      return state
  }
}

export default submissionReducer