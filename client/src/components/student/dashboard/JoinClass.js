import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const JoinClass = ({openJoinClass, setOpenJoinClass}) => {
  const [code, setCode] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={`joinClass ${openJoinClass ? 'active' : undefined}`}>
      <div className={`joinClass__box ${openJoinClass ? 'active' : undefined}`}>
        <div className='joinClass__header'>
          <h3>Join Class</h3>
          <AiOutlineClose onClick={() => setOpenJoinClass(false)} />
        </div>
        <div className='joinClass__body'>
          <form onSubmit={handleSubmit}>
            <div className='inputGroup'>
              <label htmlFor='code'>Class Code</label>
              <input type='text' id='code' value={code} onChange={e => setCode(e.target.value)} autoComplete='off' />
            </div>
            <button type='submit'>Join Class</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinClass