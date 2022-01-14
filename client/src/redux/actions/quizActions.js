import { GLOBAL_TYPES } from './../types/globalTypes'
import { QUIZ_TYPES } from './../types/quizTypes'
import { postDataAPI, patchDataAPI, getDataAPI } from './../../utils/fetchData'

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

export const updateQuiz = (id, quizData, accessToken) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await patchDataAPI(`quiz/${id}`, quizData, accessToken)
    dispatch({
      type: QUIZ_TYPES.EDIT_QUIZ,
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

export const changeQuizStatus = (id, status, accessToken) => async(dispatch) => {
  try {
    const res = await patchDataAPI(`quiz/status/${id}`, {status}, accessToken)
    dispatch({
      type: QUIZ_TYPES.CHANGE_QUIZ_STATUS,
      payload: res.data.quiz
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

export const getQuizDetail = id => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await getDataAPI(`quiz/${id}`)
    dispatch({
      type: QUIZ_TYPES.GET_QUIZ_DETAIL,
      payload: res.data.quiz
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
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

export const submitQuiz = (answer, quizId, accessToken) => async(dispatch) => {
  try {
    const res = await postDataAPI('quiz/submit', {answer, quizId}, accessToken)
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