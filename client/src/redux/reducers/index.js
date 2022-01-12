import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import instructorClass from './classReducer'
import quiz from './quizReducer'

export default combineReducers({
  auth,
  alert,
  instructorClass,
  quiz
})