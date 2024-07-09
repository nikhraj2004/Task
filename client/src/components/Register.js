import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Register = ({ handleError }) => {
  const [showCalender, setShowCalender] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      // Api to register and authenticate user
      const res = await axios({
        method: 'POST',
        url: 'register/',
        data: { username, password },
        headers: { 'Content-type': 'application/json' }
      })

      if (res.status === 200) {
        setShowCalender(true)
      } else {
        handleError("Can't Register User")
      }
    } catch (err) {
      handleError("Can't Register User")
    }
    setUserName('')
    setPassword('')
  }

  return !showCalender ? (
    <div>
      <h1> Sign Up </h1>

      <form onSubmit={handleRegistration}>
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
        <button className='button'>Sign Up!</button>
      </form>
      <p>
        <Link to='/login'>Already have account? Login!</Link>
      </p>
    </div>
  ) : (
    <Redirect to='/task' />
  )
}

export default Register
