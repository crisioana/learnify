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
    default:
      return state
  }
}

export default classReducer