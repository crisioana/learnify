const QuestionBox = ({questionIdx, title, choice, cb}) => {
  const handleChange = value => {
    cb(questionIdx, value)
  }
  
  return (
    <div className='questionBox'>
      <p>
        {title}
      </p>
      <div className="questionBox__answer">
        {
          choice?.map((item, idx) => (
            <div key={`question${questionIdx}-choice${idx}`} className='inputGroup'>
              <input type='radio' id={`question${questionIdx}-choice${idx}`} value={idx} name={`question${questionIdx}`} onChange={e => handleChange(e.target.value)} />
              <label htmlFor={`question${questionIdx}-choice${idx}`}>{item}</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionBox