import Navbar from './../../components/global/Navbar'

const Submission = () => {
  return (
    <>
      <Navbar />
      <div className='submission container'>
        <div className='submission__header'>
          <h2>Class Title Goes Here | Quiz Title</h2>
          <p>Instructor : Lecturer name goes here</p>
          <p>37/40 submissions</p>
        </div>
        <div className='submission__body'>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Correct Rate</th>
                <th>Percentage</th>
                <th>Submission Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Test</td>
                <td>30/40</td>
                <td>75%</td>
                <td>4 January 2022</td>
                <td>
                  <button>VIEW</button>
                  <button>VERIFY SCORE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Submission