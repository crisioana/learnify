import { GLOBAL_TYPES } from './../types/globalTypes'
import { CLASS_TYPES } from './../types/classTypes'
import { postDataAPI }  from './../../utils/fetchData'

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