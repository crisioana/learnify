import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SettingList = () => {
  const [name, setName] = useState('');
  const [broadcast, setBroadcast] = useState('')
  const [isRestrict, setIsRestrict] = useState(false)

  const navigate = useNavigate()

  const handleRename = e => {
    e.preventDefault()
  }

  const handleBroadcast = e => {
    e.preventDefault()
  }

  const handleCreateQuiz = () => {
    navigate('/create_quiz/dsdfs')
  }

  return (
    <div className='settingList'>
      <div className='restrictGroup'>
        <p>Restrict people to join class</p>
        <div onClick={() => setIsRestrict(!isRestrict)} className={`switchOuter ${isRestrict ? 'active' : undefined}`}>
          <p>{isRestrict ? 'ON' : 'OFF'}</p>
          <div className='switchInner'></div>
        </div>
      </div>

      <form onSubmit={handleRename}>
        <div className='inputGroup'>
          <label htmlFor='name'>Rename class</label>
          <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <button type='submit'>Rename</button>
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