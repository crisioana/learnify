import { useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postDataAPI } from './../../utils/fetchData'
import { useAlert } from 'react-alert'
import HeadInfo from './../../utils/HeadInfo'

const ActivateAccount = () => {
  const { id: token } = useParams()

  const toast = useAlert()
  const navigate = useNavigate()
  const { auth } = useSelector(state => state)

  const activateAccount = useCallback(async() => {
    try {
      const res = await postDataAPI('auth/activate', {token})
      await toast.success(res.data.msg)
      navigate('/login')
    } catch (err) {
      await toast.error(err.response.data.msg)
      navigate('/login')
    }
  }, [token, toast, navigate])

  useEffect(() => {
    if (!token) return
    activateAccount()
  }, [token, activateAccount])

  useEffect(() => {
    if (auth.user)
      navigate('/')
  }, [auth.user, navigate])

  return (
    <>
      <HeadInfo title='Activate Account' />
      <div></div>
    </>
  )
}

export default ActivateAccount