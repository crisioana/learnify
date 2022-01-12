import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './../../../redux/types/globalTypes'
import { changeClassStatus, renameClass } from './../../../redux/actions/classActions'
import Loader from './../../global/Loader'

const SettingList = ({id}) => {
  const [name, setName] = useState('');
  const [broadcast, setBroadcast] = useState('')
  const [isRestrict, setIsRestrict] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth, alert } = useSelector(state => state)

  const handleRename = e => {
    e.preventDefault()
    if (!name) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Class name can\'t be empty.'
        }
      })
    }

    dispatch(renameClass(id, name, auth.accessToken))
  }

  const handleBroadcast = e => {
    e.preventDefault()
  }

  const handleCreateQuiz = () => {
    navigate('/create_quiz/dsdfs')
  }

  const handleChangeStatus = () => {
    setIsRestrict(!isRestrict)
    dispatch(changeClassStatus(id, !isRestrict, auth.accessToken))
  }

  return (
    <div className='settingList'>
      <div className='restrictGroup'>
        <p>Restrict people to join class</p>
        <div onClick={handleChangeStatus} className={`switchOuter ${isRestrict ? 'active' : undefined}`}>
          <p>{isRestrict ? 'ON' : 'OFF'}</p>
          <div className='switchInner'></div>
        </div>
      </div>

      <form onSubmit={handleRename}>
        <div className='inputGroup'>
          <label htmlFor='name'>Rename class</label>
          <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <button type='submit' disabled={alert.loading ? true : false}>
          {
            alert.loading
            ? (
              <div className='center'>
                <Loader width='20px' height='20px' border='2px' />
              </div>
            )
            : 'Rename'
          }
        </button>
      </form>

      <form onSubmit={handleBroadcast}>
        <div className="inputGroup">
          <label htmlFor='broadcast'>Broadcast</label>
          <input type='text' id='broadcast' value={broadcast} onChange={e => setBroadcast(e.target.value)} />
        </div>
        <button type='submit'>Broadcast</button>
      </form>

      <button onClick={handleCreateQuiz} className='createQuizBtn'>Create Quiz for "Class Title Goes Here" Class</button>
      <button className='deleteBtn'>Delete "Class Title Goes Here" Class</button>
    </div>
  )
}

export default SettingList