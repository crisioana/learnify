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
    default:
      return state
  }
}

export default classReducer