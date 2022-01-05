import Avatar from './../../global/Avatar'

const PeopleCard = () => {
  return (
    <div className='peopleCard'>
      <div className='peopleCard__left'>
        <Avatar />
        <div className='peopleCard__left--info'>
          <h4>Student Name</h4>
          <p>studentemail@example.com</p>
        </div>
      </div>
      <div className='peopleCard__right'>
        <button>Kick</button>
      </div>
    </div>
  )
}

export default PeopleCard