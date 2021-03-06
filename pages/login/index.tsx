import React, { useEffect, useState } from 'react'
import { useStores } from 'stores'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(false)
  const { authStore } = useStores()
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    authStore.login({ username, password, isRemember })
  }
  function toggleRemember() {
    setIsRemember(!isRemember)
  }
  useEffect(() => {
    if (window) {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [])
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" checked={isRemember} onClick={toggleRemember} />
          <label htmlFor="isRemember">Remember account</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
