import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'

const ChangePassword = ({openChangePassword, setOpenChangePassword}) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  })
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    setPasswordData({...passwordData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!passwordData.oldPassword || !passwordData.newPasswordConfirmation || !passwordData.newPassword) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please provide every field.'
        }
      })
    }
  }

  return (
    <div className={`changePassword ${openChangePassword ? 'active' : undefined}`}>
      <div className={`changePassword__box ${openChangePassword ? 'active' : undefined}`}>
        <div className='changePassword__header'>
          <h3>Change Password</h3>
          <AiOutlineClose onClick={() => setOpenChangePassword(false)} />
        </div>
        <div className='changePassword__body'>
          <form onSubmit={handleSubmit}>
            <div className='inputGroup'>
              <label htmlFor='oldPassword'>Current Password</label>
              <div className='inputGroup--password'>
                <input type={showOldPassword ? 'text' : 'password'} id='oldPassword' name='oldPassword' value={passwordData.oldPassword} onChange={handleChange} />
                {
                  showOldPassword
                  ? <FaEyeSlash onClick={() => setShowOldPassword(false)} />
                  : <FaEye onClick={() => setShowOldPassword(true)} />
                }
              </div>
            </div>
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
    </div>
  )
}

export default ChangePassword