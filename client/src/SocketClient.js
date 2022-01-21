import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NOTIFICATION_TYPES } from './redux/types/notificationTypes'

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  useEffect(() => {
    socket.on('sendBroadcastToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATION,
        payload: data
      })
    })

    return () => socket.off('sendBroadcastToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('createQuizToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATION,
        payload: data
      })
    })

    return () => socket.off('createQuizToClient')
  }, [dispatch, socket])

  return (
    <div></div>
  )
}

export default SocketClient