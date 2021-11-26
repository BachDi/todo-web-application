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
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>
      <label htmlFor="username">
        username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="username" />
      </label>
      <br />

      <label htmlFor="password">
        password:
        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
      </label>
      <br />

      <label htmlFor="name">
        name:
        <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="input" />
      </label>
      <br />

      <label htmlFor="role">
        role
        <input value="user" onChange={(e) => setRole(e.target.value)} name="role" type="radio" id="user" />
        <label htmlFor="user">User</label>
        <input value="admin" onChange={(e) => setRole(e.target.value)} name="role" type="radio" id="admin" />
        <label htmlFor="admin">Admin</label>
      </label>
      <br />

      <input type="submit" value="Submit" />
    </form>
  )
}

export default SignUp
