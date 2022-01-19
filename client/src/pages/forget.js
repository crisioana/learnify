import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from './../redux/types/globalTypes'

const Forget = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

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
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Forget