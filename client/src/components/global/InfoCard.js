import { AiOutlineClose } from 'react-icons/ai'

const InfoCard = () => {
  return (
    <div className='infoCard'>
      <div className='infoCard__left'>
        <h2>Title</h2>
        <h4>40 Students</h4>
      </div>
      <div className='infoCard__right'>
        <AiOutlineClose />
      </div> 
    </div>
  )
}

export default InfoCard