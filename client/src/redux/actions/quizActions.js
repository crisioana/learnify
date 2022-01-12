import { GLOBAL_TYPES } from './../types/globalTypes'
import { QUIZ_TYPES } from './../types/quizTypes'
import { postDataAPI } from './../../utils/fetchData'

export const createQuiz = (quizData, accessToken) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('quiz', quizData, accessToken)
    dispatch({
      type: QUIZ_TYPES.CREATE_QUIZ,
      payload: res.data.quiz
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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