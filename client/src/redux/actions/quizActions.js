import { GLOBAL_TYPES } from './../types/globalTypes'
import { QUIZ_TYPES } from './../types/quizTypes'
import { postDataAPI, patchDataAPI, getDataAPI, deleteDataAPI } from './../../utils/fetchData'
import { createNotification } from './notificationActions'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const createQuiz = (quizData, accessToken, socket) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('quiz', quizData, access_token)
    dispatch({
      type: QUIZ_TYPES.CREATE_QUIZ,
      payload: res.data.quiz
    })
    
    for (let i = 0; i < quizData.people.length; i++) {
      const data = {
        to: quizData.people[i],
        title: 'New Quiz',
        description: `New quiz from instructor ${quizData.author.name}`,
        author: quizData.author._id,
        authorName: quizData.author.name,
        link: `/quiz/${res.data.quiz._id}`
      }
       
      const notifId = await dispatch(createNotification(data, accessToken))
  
      socket.emit('createQuiz', {...data, _id: notifId})
    }

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
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await patchDataAPI(`quiz/${id}`, quizData, access_token)
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
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await patchDataAPI(`quiz/status/${id}`, {status}, access_token)
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

export const submitQuiz = (answer, student, quizId, instructorId, quizTitle, accessToken, socket) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await postDataAPI('quiz/submit', {answer, quizId}, access_token)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

    const data = {
      to: instructorId,
      title: 'New submission',
      description: `New submission from ${student.name} on "${quizTitle}" quiz`,
      author: student.id,
      authorName: student.name,
      link: `/submission/${quizId}`
    }
    const notifId = await dispatch(createNotification(data, accessToken))

    socket.emit('submitQuiz', {...data, _id: notifId})

    socket.emit('addSubmission', {...res.data.result, quizId, to: instructorId})
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const deleteQuiz = (id, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await deleteDataAPI(`quiz/${id}`, access_token)
    dispatch({
      type: QUIZ_TYPES.DELETE_QUIZ,
      payload: {
        quizId: res.data.quizId,
        classId: res.data.classId
      }
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