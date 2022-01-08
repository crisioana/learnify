import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const CreateClass = ({openCreateClass, setOpenCreateClass}) => {
  const [classData, setClassData] = useState({
    name: '',
    description: ''
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setClassData({...classData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={`createClass ${openCreateClass ? 'active' : undefined}`}>
      <div className={`createClass__box ${openCreateClass ? 'active' : undefined}`}>
        <div className='createClass__header'>
          <h3>Create Class</h3>
          <AiOutlineClose onClick={() => setOpenCreateClass(false)} />
        </div>
        <div className='createClass__body'>
          <form onSubmit={handleSubmit}>
            <div className='inputGroup'>
              <label htmlFor='name'>Class Name</label>
              <input type='text' name='name' id='name' value={classData.name} onChange={handleChange} autoComplete='off' />
            </div>
            <div className='inputGroup'>
              <label htmlFor='description'>Class Description</label>
              <textarea id='description' name='description' value={classData.description} onChange={handleChange} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateClass