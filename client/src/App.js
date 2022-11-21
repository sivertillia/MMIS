import { SignInSide } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { useAuth } from './hooks/useAuth'
import { Route, Routes } from 'react-router-dom'
import { RouteConstants } from './routes/routes-constant'
import { Home } from './pages/Home'
import Box from '@mui/material/Box'
import Notification from './components/Notification/Notification'
import { EagleTails } from './pages/EagleTails'

function App() {
  useAuth()
  return (
    <Box>
      <Routes>
        <Route index element={<Home />} />
        <Route path={RouteConstants.LOGIN_PATH} element={<SignInSide />} />
        <Route path={RouteConstants.REGISTRATION_PATH} element={<SignUp />} />
        <Route path={RouteConstants.EAGLE_TAILS_PATH} element={<EagleTails />} />
        <Route path={RouteConstants.PREDATOR_PREY_PATH} element={<EagleTails />} />
      </Routes>
      <Notification />
    </Box>

  )
}

export default App
