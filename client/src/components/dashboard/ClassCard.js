const ClassCard = ({title, description, instructor}) => {
  return (
    <div className='classCard'>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Instructor: {instructor}</p>
      <button>Expand</button>
    </div>
  )
}

export default ClassCard