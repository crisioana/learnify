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
    default:
      return state
  }
}

export default classReducer