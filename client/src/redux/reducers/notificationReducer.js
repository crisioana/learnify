import { NOTIFICATION_TYPES } from './../types/notificationTypes'

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.GET_ALL_NOTIFICATIONS:
      return action.payload.reverse()
    case NOTIFICATION_TYPES.CREATE_NOTIFICATION:
      return [
        { title: action.payload.title, description: action.payload.description, author: { name: action.payload.authorName }, isRead: false },
        ...state
      ]
    default:
      return state
  }
}

export default notificationReducer