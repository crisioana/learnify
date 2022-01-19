import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'

const ResetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    newPasswordConfirmation: ''
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    setPasswordData({...passwordData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!passwordData.newPassword || !passwordData.newPasswordConfirmation) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please provide all field.'
        }
      })
    }

    if (passwordData.newPassword.length < 8) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password length should be at least 8 characters.'
        }
      })
    }

    if (passwordData.newPassword !== passwordData.newPasswordConfirmation) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password confirmation should be matched.'
        }
      })
    }
  }

  return (
    <div className='auth'>
      <div className='auth__left'>
        <img src={`${process.env.PUBLIC_URL}/images/auth.jpg`} alt='Learnify Login' />
      </div>
      <div className='auth__right'>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='newPassword'>New Password</label>
            <div className='inputGroup--password'>
              <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' value={passwordData.newPassword} onChange={handleChange} />
              {
                showNewPassword
                ? <FaEyeSlash onClick={() => setShowNewPassword(false)} />
                : <FaEye onClick={() => setShowNewPassword(true)} />
              }
            </div>
          </div>
          <div className='inputGroup'>
            <label htmlFor='newPasswordConfirmation'>New Password Confirmation</label>
            <div className='inputGroup--password'>
              <input type={showNewPasswordConfirmation ? 'text' : 'password'} id='newPasswordConfirmation' name='newPasswordConfirmation' value={passwordData.newPasswordConfirmation} onChange={handleChange} />
              {
                showNewPasswordConfirmation
                ? <FaEyeSlash onClick={() => setShowNewPasswordConfirmation(false)} />
                : <FaEye onClick={() => setShowNewPasswordConfirmation(true)} />
              }
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword