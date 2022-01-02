import { AiOutlineClose } from 'react-icons/ai'
import { GiTeacher } from 'react-icons/gi'
import { FaUserGraduate } from 'react-icons/fa'
import Role from './Role';

const RoleModal = ({cb, currentRole, onChooseRole, setOnChooseRole, handleSubmit}) => {
  return (
    <div className={`roleModal ${onChooseRole ? 'active' : undefined}`}>
      <div className={`roleModal__box ${onChooseRole ? 'active' : undefined}`}>
        <div className='roleModal__header'>
          <h3>Choose Your Role</h3>
          <AiOutlineClose onClick={() => setOnChooseRole(false)} />
        </div>
        <div className='roleModal__body'>
          <div className='roleModal__choice'>
            <Role
              currentRole={currentRole}
              Icon={FaUserGraduate}
              text='Student'
              cb={cb}
            />
            <Role
              currentRole={currentRole}
              Icon={GiTeacher}
              text='Instructor'
              cb={cb}
            />
          </div>
          <button type='submit' onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default RoleModal