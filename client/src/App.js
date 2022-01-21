import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from './redux/actions/authActions'
import { getNotifications } from './redux/actions/notificationActions'
import { GLOBAL_TYPES } from './redux/types/globalTypes'
import Alert from './components/global/Alert'
import PageRender from './utils/PageRender'
import Login from './pages/login'
import SocketClient from './SocketClient'
import Dashboard from './pages/dashboard'
import io from 'socket.io-client'

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    if (auth.accessToken)
      dispatch(getNotifications(auth.accessToken))
  }, [dispatch, auth.accessToken])

  return (
    <Router>
      { auth.accessToken && <SocketClient /> }
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