import { GLOBAL_TYPES } from './../types/globalTypes'
import { NOTIFICATION_TYPES } from './../types/notificationTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'

export const getNotifications = (accessToken) => async(dispatch) => {
  try {
    const res = await getDataAPI('notification', accessToken)
    dispatch({
      type: NOTIFICATION_TYPES.GET_ALL_NOTIFICATIONS,
      payload: res.data.notifications[0].data
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

export const createNotification = (data, accessToken) => async(dispatch) => {
  try {
    await postDataAPI('notification', data, accessToken)
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}