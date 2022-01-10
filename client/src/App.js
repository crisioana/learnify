import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from './redux/actions/authActions'
import Alert from './components/global/Alert'
import PageRender from './utils/PageRender'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Alert />
      <Routes>
        <Route path='/' element={auth.user ? <Dashboard /> : <Login />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App