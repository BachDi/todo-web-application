import React, {useState} from 'react';
import { useStores } from 'stores';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {authStore} = useStores()
  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    authStore.login({username,password})
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Login</p>
      <label htmlFor="username">
        username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
        />
      </label>
      <br />

      <label htmlFor="password">
        password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
