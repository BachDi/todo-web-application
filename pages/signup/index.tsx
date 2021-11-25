import { signUp } from 'API/authenticate';
import React, {useState} from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  // TODO: sẽ làm xác nhận sau // const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    signUp({username,password})
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>
      <label htmlFor="username">
        username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="username"
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

      <label htmlFor="name">
        name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="input"
        />
      </label>
      <br />

      <label htmlFor="password">
        address
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          type="input"
        />
      </label>
      <br />

      <label htmlFor="password">
        phone
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
          type="input"
        />
      </label>
      <br />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
