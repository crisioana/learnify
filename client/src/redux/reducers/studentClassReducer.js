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
    default:
      return state
  }
}

export default studentClassReducer