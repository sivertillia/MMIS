import { Box, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { logOut } from '../../helpers'
import MultilineChart from '../../components/Chart'
import { useState } from 'react'

export const EagleTails = () => {
  const [col, setCol] = useState(0)
  const [count, setCount] = useState(0)
  const [update, setUpdate] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newCol = data.get('col')
    const newCount = data.get('count')
    setCol(newCol)
    setCount(newCount)
    setUpdate(!update)
  }

  return (
    <Box>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', width: '300px', ml: 'auto', mr: 'auto' }}
      >
        <TextField name={'col'} size={'small'} defaultValue={col} />
        <TextField name={'count'} size={'small'} defaultValue={count} />
        <Button size={'small'} variant='contained' type={'submit'}>Update</Button>
      </Box>
      <MultilineChart col={col} count={count} update={update} />
    </Box>
  )
}
