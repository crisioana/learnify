import { QUIZ_TYPES } from '../types/quizTypes'
import { CLASS_TYPES } from './../types/classTypes'

const initialState = {
  data: []
}

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_TYPES.CREATE_CLASS:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case CLASS_TYPES.GET_CLASSES:
      return {
        ...state,
        data: action.payload
      }
    case CLASS_TYPES.RENAME_CLASS:
      return {
        ...state,
        data: state.data.map(item => item._id ===  action.payload._id ? action.payload : item)
      }
    case CLASS_TYPES.CHANGE_CLASS_STATUS:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload._id
          ? {
            ...item,
            restrict: action.payload.restrict
          }
          : item
        ))
      }
    case QUIZ_TYPES.CREATE_QUIZ:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.class
          ? {
            ...item,
            quizzes: [action.payload, ...item.quizzes]
          }
          : item
        ))
      }
    case QUIZ_TYPES.EDIT_QUIZ:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.class
          ? {
            ...item,
            quizzes: item.quizzes.map(quiz => (
              quiz._id === action.payload._id
              ? {
                ...quiz,
                title: action.payload.title,
                questions: action.payload.questions
              }
              : quiz
            ))
          }
          : item
        ))
      }
    case QUIZ_TYPES.CHANGE_QUIZ_STATUS:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.class
          ? {
            ...item,
            quizzes: item.quizzes.map(quiz => (
              quiz._id === action.payload._id
              ? {
                ...quiz,
                status: action.payload.status
              }
              : quiz
            ))
          }
          : item
        ))
      }
    case QUIZ_TYPES.DELETE_QUIZ:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.classId
          ? {
            ...item,
            quizzes: item.quizzes.filter(quiz => quiz._id !== action.payload.quizId)
          }
          : item
        ))
      }
    default:
      return state
  }
}

export default classReducer