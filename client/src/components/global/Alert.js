import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'

const Alert = () => {
  const { alert } = useSelector(state => state)

  const toast = useAlert()

  useEffect(() => {
    if (alert.errors) {
      toast.error(alert.errors)
    }
  }, [alert.errors, toast])

  useEffect(() => {
    if (alert.success) {
      toast.success(alert.success)
    }
  }, [alert.success, toast])

  return (
    <div></div>
  )
}

export default Alert