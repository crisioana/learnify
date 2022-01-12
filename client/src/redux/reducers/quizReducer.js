import { QUIZ_TYPES } from './../types/quizTypes'

const initialState = {
  data: []
}

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_TYPES.CREATE_QUIZ:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    default:
      return state
  }
}

export default quizReducer