import { GLOBAL_TYPES } from './../types/globalTypes'
import { CLASS_TYPES } from './../types/classTypes'
import { getDataAPI, postDataAPI, patchDataAPI }  from './../../utils/fetchData'

export const getClasses = accessToken => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('class', accessToken)
    dispatch({
      type: CLASS_TYPES.GET_CLASSES,
      payload: res.data.classes
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
    const res = await postDataAPI('class', classData, accessToken)
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
    const res = await patchDataAPI(`class/restrict/${id}`, {status}, accessToken)
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
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await patchDataAPI(`class/rename/${id}`, {name}, accessToken)
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

export const getStudentClasses = accessToken => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('class/student', accessToken)
    dispatch({
      type: CLASS_TYPES.GET_STUDENT_CLASSES,
      payload: res.data.classes
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
    const res = await patchDataAPI(`class/join/${id}`, {}, accessToken)
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
    const res = await patchDataAPI(`class/kick/${id}`, {classId}, accessToken)
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