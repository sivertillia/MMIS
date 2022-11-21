import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RouteConstants } from '../routes/routes-constant'

export const useAuth = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  const access_token = localStorage.getItem('access_token')

  const goToLogin = () => navigate(RouteConstants.LOGIN_PATH)
  const goToHome = () => navigate(RouteConstants.HOME_PATH)

  useEffect(() => {
    if (location.pathname !== RouteConstants.LOGIN_PATH) {
      setIsLoggedIn(!!access_token)

      if (!access_token) {
        console.log('LOG OUT')
        goToLogin()
      }
    }

    if (location.pathname === RouteConstants.LOGIN_PATH && access_token) {
      goToHome()
    }
    if (location.pathname === RouteConstants.REGISTRATION_PATH && access_token) {
      goToHome()
    }

  }, [access_token, location])

  return { isLoggedIn }
}
