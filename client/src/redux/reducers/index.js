import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import instructorClass from './classReducer'
import studentClass from './studentClassReducer'
import quizDetail from './quizDetailReducer'
import category from './categoryReducer'
import submission from './submissionReducer'

export default combineReducers({
  auth,
  alert,
  instructorClass,
  studentClass,
  quizDetail,
  category,
  submission
})