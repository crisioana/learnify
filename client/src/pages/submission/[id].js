import Navbar from './../../components/global/Navbar'
import TableRow from './../../components/submission/TableRow'

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
              <TableRow />
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Submission