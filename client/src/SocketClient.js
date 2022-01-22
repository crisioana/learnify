import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NOTIFICATION_TYPES } from './redux/types/notificationTypes'

const spawnNotification = (body, url, title) => {
  let options = {
    body
  }

  let n = new Notification(title, options)

  n.onClick = e => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}

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

      spawnNotification(data.title, 'http://localhost:3000', 'Learnify')
    })

    return () => socket.off('sendBroadcastToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('createQuizToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATION,
        payload: data
      })
      
      spawnNotification(data.title, `http://localhost:3000${data.link}`, 'Learnify')
    })

    return () => socket.off('createQuizToClient')
  }, [dispatch, socket])
  
  useEffect(() => {
    socket.on('submitQuizToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATION,
        payload: data
      })

      spawnNotification(data.title, `http://localhost:3000${data.link}`, 'Learnify')
    })

    return () => socket.off('submitQuizToClient')
  }, [dispatch, socket])

  return (
    <div></div>
  )
}

export default SocketClient