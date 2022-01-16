import { GLOBAL_TYPES } from './../types/globalTypes'
import { CATEGORY_TYPES } from './../types/categoryTypes'
import { getDataAPI } from './../../utils/fetchData'

export const getAllCategory = () => async(dispatch) => {
  try {
    const res = await getDataAPI('category')
    dispatch({
      type: CATEGORY_TYPES.GET_ALL_CATEGORY,
      payload: res.data.categories
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}