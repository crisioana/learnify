import { CLASS_TYPES } from './../types/classTypes'

const initialState = {
  data: []
}

const studentClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_TYPES.JOIN_CLASS:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case CLASS_TYPES.GET_STUDENT_CLASSES:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default studentClassReducer