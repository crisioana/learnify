import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Alert from './components/global/Alert'
import PageRender from './utils/PageRender'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

const App = () => {
  const { auth } = useSelector(state => state)

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