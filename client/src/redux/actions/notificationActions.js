import { GLOBAL_TYPES } from './../types/globalTypes'
import { NOTIFICATION_TYPES } from './../types/notificationTypes'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'

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
    const notifId = await postDataAPI('notification', data, accessToken)
    return notifId.data.id
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const readNotification = (id, accessToken) => async(dispatch) => {
  try {
    await patchDataAPI(`notification/${id}`, {}, accessToken)
    dispatch({
      type: NOTIFICATION_TYPES.READ_NOTIFICATION,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.respponse.data.msg
      }
    })
  }
}