import { GLOBAL_TYPES } from './../types/globalTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'

export const register = userData => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/register', userData)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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

export const login = (userData) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await postDataAPI('auth/login', userData)
    localStorage.setItem('islogged-learnify', true)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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

export const refreshToken = () => async(dispatch) => {
  try {
    const logged = localStorage.getItem('islogged-learnify')

    if (logged) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          loading: true
        }
      })

      const res = await getDataAPI('auth/refresh_token')
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          user: res.data.user,
          accessToken: res.data.accessToken
        }
      })
      
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {}
      })
    }
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const logout = () => async(dispatch) => {
  try {
    const res = await getDataAPI('auth/logout')
    localStorage.removeItem('islogged-learnify')
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {}
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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

export const googleLogin = id_token => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/google_login', {token: id_token})
    localStorage.setItem('islogged-learnify', true)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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

export const facebookLogin = (accessToken, userID) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/facebook_login', {accessToken, userID})
    localStorage.setItem('islogged-learnify', true)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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