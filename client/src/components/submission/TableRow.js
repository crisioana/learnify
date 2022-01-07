import { useState } from 'react'
import GradeModal from './../global/GradeModal'

const TableRow = () => {
  const [isOpenGrade, setIsOpenGrade] = useState(false)

  return (
    <>
      <tr>
        <td>1</td>
        <td>Test</td>
        <td>30/40</td>
        <td>75%</td>
        <td>4 January 2022</td>
        <td>
          <button onClick={() => setIsOpenGrade(true)}>VIEW</button>
          <button>VERIFY SCORE</button>
        </td>
      </tr>

      <GradeModal
        isOpenGrade={isOpenGrade}
        setIsOpenGrade={setIsOpenGrade}
      />
    </>
  )
}

export default TableRow