import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='auth'>
      <div className="auth__left">
        
      </div>
      <div className="auth__right">
        <h2>Sign In To Learnify</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='email'>Email address</label>
            <input type='text' name='email' id='email' value={userData.email} onChange={handleChange} autoComplete='off' />
          </div>
          <div className="inputGroup">
            <label htmlFor='password'>Password</label>
            <div className="inputGroup--password">
              <input type={showPassword ? 'text' : 'password'} name='password' id='password' value={userData.password} onChange={handleChange} />
              {
                showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} />
                : <FaEye onClick={() => setShowPassword(true)} />
              }
            </div>
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>Don't have an account yet? Click <Link to='/register'>here</Link></p>
      </div>
    </div>
  )
}

export default Login