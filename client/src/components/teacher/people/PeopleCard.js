import { useDispatch, useSelector } from 'react-redux'
import { kickStudent } from './../../../redux/actions/classActions'
import Avatar from './../../global/Avatar'

const PeopleCard = ({id, classId, avatar, name, email}) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleKick = () => {
    dispatch(kickStudent(id, classId, auth.accessToken))
  }

  return (
    <div className='peopleCard'>
      <div className='peopleCard__left'>
        <Avatar src={avatar} alt={name} />
        <div className='peopleCard__left--info'>
          <h4>{name}</h4>
          <p>{email}</p>
        </div>
      </div>
      <div className='peopleCard__right'>
        <button onClick={handleKick}>Kick</button>
      </div>
    </div>
  )
}

export default PeopleCard