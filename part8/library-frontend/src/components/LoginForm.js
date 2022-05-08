import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [loginReq, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
  })
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  console.log(userName, password)
  const submit = async (event) => {
    event.preventDefault()
    loginReq({
      variables: { username: userName, password: password },
    })
  }
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      //   props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <>
      <h2>Login to Library</h2>
      <form onSubmit={submit}>
        username
        <input
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <br />
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  )
}
export default LoginForm
