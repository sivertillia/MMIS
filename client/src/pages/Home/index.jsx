import { Box, Link } from '@mui/material'
import { RouteConstants } from '../../routes/routes-constant'

export const Home = () => {

  return (
    <Box>
      <Link href={RouteConstants.EAGLE_TAILS_PATH}>Eagle tails</Link>
      {/*<Link href={RouteConstants.PREDATOR_PREY_PATH}>Predator Prey</Link>*/}
    </Box>
  )
}
