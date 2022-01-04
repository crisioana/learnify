const QuestionBox = () => {
  return (
    <div className='questionBox'>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde labore fugit saepe cumque, non molestias quia odio suscipit. Fuga, at.
      </p>
      <div className="questionBox__answer">
        <div className='inputGroup'>
          <input type='radio' name='question1' />
          <label>Morphology</label>
        </div>
        <div className='inputGroup'>
          <input type='radio' name='question1' />
          <label>Morphology</label>
        </div>
        <div className='inputGroup'>
          <input type='radio' name='question1' />
          <label>Morphology</label>
        </div>
        <div className='inputGroup'>
          <input type='radio' name='question1' />
          <label>Morphology</label>
        </div>
      </div>
    </div>
  )
}

export default QuestionBox