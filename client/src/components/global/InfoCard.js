const InfoCard = ({title, description, color, Icon}) => {
  return (
    <div className={`infoCard infoCard--${color}`}>
      <div className='infoCard__left'>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
      <div className='infoCard__right'>
        <Icon />
      </div> 
    </div>
  )
}

export default InfoCard