import { signUp } from 'API/authenticate'
import React, { useState } from 'react'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  // TODO: sẽ làm xác nhận sau // const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    signUp({ username, password, name, role })
    console.log({ username, password, name, role })
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="username" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="input" />
        </div>

        <div className="radio-group">
          <label htmlFor="role">Role:</label>
          <input value="user" onChange={(e) => setRole(e.target.value)} name="role" type="radio" id="user" />
          <label htmlFor="user">User</label>
          <input value="admin" onChange={(e) => setRole(e.target.value)} name="role" type="radio" id="admin" />
          <label htmlFor="admin">Admin</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
