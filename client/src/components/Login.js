import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = ({ handleError }) => {
  const [showCalender, setShowCalender] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // Api to authenticate user
      const res = await axios({
        method: 'POST',
        url: 'login/',
        data: { username, password },
        headers: { 'Content-type': 'application/json' }
      })

      if (res.status === 200) {
        setShowCalender(true)
      } else {
        handleError("Can't Login User")
      }
    } catch (err) {
      console.log(err)
      handleError("Can't Login User")
    }
    setUserName('')
    setPassword('')
  }

  return !showCalender ? (
    <div>
      <h1> Login </h1>

      <form onSubmit={handleLogin}>
        <input
          required
          type='text'
          value={username}
          autoFocus
          placeholder=' username'
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          required
          type='password'
          value={password}
          placeholder=' password'
          autoComplete='on'
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='button'>Login!</button>
      </form>
      <p>
        <Link to='/'>Can't Login? Sign Up!</Link>
      </p>
    </div>
  ) : (
    <Redirect to='/task' />
  )
}

export default Login
