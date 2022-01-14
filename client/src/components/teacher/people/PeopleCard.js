import Avatar from './../../global/Avatar'

const PeopleCard = ({avatar, name, email}) => {
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
        <button>Kick</button>
      </div>
    </div>
  )
}

export default PeopleCard