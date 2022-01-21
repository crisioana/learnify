import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notFound'>
      <h2>404 | Page Not Found</h2>
      <p>- Learnify -</p>
      <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default NotFound