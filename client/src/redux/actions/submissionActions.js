import { GLOBAL_TYPES } from './../types/globalTypes'
import { SUBMISSION_TYPES } from './../types/submissionTypes'
import { getDataAPI } from './../../utils/fetchData'

export const getSubmissionsByQuiz = (quizId, accessToken) => async(dispatch) => {
  try {
    const res = await getDataAPI(`result/quiz/${quizId}`, accessToken)
    dispatch({
      type: SUBMISSION_TYPES.GET_SUBMISSIONS_BY_QUIZ,
      payload: res.data.submissions
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}