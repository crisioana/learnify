import { useDispatch } from 'react-redux'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from './../../utils/constant'
import { googleLogin } from './../../redux/actions/authActions'
import GoogleLogin from 'react-google-login-lite'
import FacebookLogin from 'react-facebook-login-lite'

const SocialLogin = () => {
  const dispatch = useDispatch()

  const onGoogleSuccess = response => {
    const { id_token } = response.getAuthResponse()
    dispatch(googleLogin(id_token))  
  }

  const onFacebookSuccess = response => {

  }

  return (
    <>
      <div style={{ marginBottom: '25px' }}>
        <GoogleLogin
          client_id={GOOGLE_CLIENT_ID}
          cookiepolicy='single_host_origin'
          onSuccess={onGoogleSuccess}
        />
      </div>
      
      <div style={{ marginBottom: '25px' }}>
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          onSuccess={onFacebookSuccess}
        />
      </div>
    </>
  )
}

export default SocialLogin