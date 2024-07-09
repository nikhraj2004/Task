import React from 'react'

const Error = ({ message }) => {
  return (
    <>
      <h1 className='error'> Error: {message} </h1>
      <div style={{ textAlign: 'center' }}>
        <a href='/login'>Go to Login Page!</a>
      </div>
    </>
  )
}

export default Error
