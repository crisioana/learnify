import { GLOBAL_TYPES } from './../types/globalTypes'
import { CLASS_TYPES } from './../types/classTypes'
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI }  from './../../utils/fetchData'
import { createNotification } from './notificationActions'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const getClasses = (accessToken, page) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`class?page=${page}`, access_token)
    dispatch({
      type: CLASS_TYPES.GET_CLASSES,
      payload: res.data
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: false
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

export const createClass = (classData, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await postDataAPI('class', classData, access_token)
    dispatch({
      type: CLASS_TYPES.CREATE_CLASS,
      payload: res.data.class
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

export const changeClassStatus = (id, status, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await patchDataAPI(`class/restrict/${id}`, {status}, access_token)
    dispatch({
      type: CLASS_TYPES.CHANGE_CLASS_STATUS,
      payload: res.data.class
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

export const renameClass = (id, name, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : access_token

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await patchDataAPI(`class/rename/${id}`, {name}, access_token)
    dispatch({
      type: CLASS_TYPES.RENAME_CLASS,
      payload: res.data.class
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

export const getStudentClasses = (accessToken, page, sort) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    let url = `class/student?page=${page}`
    if (sort === 'descending') {
      url = url + `&sort=descending`
    }

    const res = await getDataAPI(url, access_token)
    dispatch({
      type: CLASS_TYPES.GET_STUDENT_CLASSES,
      payload: res.data
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

export const joinClass = (id, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await patchDataAPI(`class/join/${id}`, {}, access_token)
    dispatch({
      type: CLASS_TYPES.JOIN_CLASS,
      payload: res.data.class
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

export const kickStudent = (id, classId, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token =  tokenExp ? tokenExp : accessToken

    const res = await patchDataAPI(`class/kick/${id}`, {classId}, access_token)
    dispatch({
      type: CLASS_TYPES.KICK_STUDENT,
      payload: {
        classId,
        studentId: id
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

export const deleteClass = (id, accessToken) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    const res = await deleteDataAPI(`class/${id}`, access_token)
    dispatch({
      type: CLASS_TYPES.DELETE_CLASS,
      payload: id
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

export const sendBroadcast = (description, people, className, author, accessToken, socket) => async(dispatch) => {
  try {
    const tokenExp = await checkTokenExp(accessToken, dispatch)
    const access_token = tokenExp ? tokenExp : accessToken

    for (let i = 0; i < people.length; i++) {
      const data = {
        to: people[i]._id,
        title: `Class "${className}" broadcast`,
        description,
        author: author.id,
        authorName: author.name
      }

      const notifId = await dispatch(createNotification(data, access_token))

      socket.emit('sendBroadcast', {...data, _id: notifId})
    }
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}