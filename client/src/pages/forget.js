import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './../redux/types/globalTypes'
import { forgetPassword } from './../redux/actions/authActions'
import Loader from './../components/global/Loader'

const Forget = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const { alert } = useSelector(state => state)

  const handleSubmit = e => {
    e.preventDefault()

    if (!email) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Email field can\'t be empty.'
        }
      })
    }

    dispatch(forgetPassword(email))
  }

  return (
    <div className='auth'>
      <div className='auth__left'>
        <img src={`${process.env.PUBLIC_URL}/images/auth.jpg`} alt='Learnify Login' />
      </div>
      <div className='auth__right'>
        <h2>Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='email'>Email address</label>
            <input type='text' id='email' name='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button type='submit' disabled={alert.loading ? true : false}>
            {
              alert.loading
              ? (
                <div className='center'>
                  <Loader width='20px' height='20px' border='2px' />
                </div>
              )
              : 'Submit'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Forget