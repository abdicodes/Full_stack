import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userInfo } from '../reducers/userReducer'
import { Button, Box, TextField } from '@mui/material'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userInfo({ username: username, password: password }))
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          id="username"
          value={username}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          label="Username"
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button id="submit-login" type="submit" variant="contained">
          {' '}
          login
        </Button>
      </Box>
    </form>
  )
}
export default LoginForm
