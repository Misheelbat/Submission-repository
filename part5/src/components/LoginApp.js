import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { showAsync } from '../features/NotificationSlice';

export default function LoginApp({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(showAsync({ msg: 'logged in', type: 'success' }));
      setUser(user);
    } catch (error) {
      dispatch(
        showAsync({ msg: 'wrong username or password', type: 'failure' })
      );
      setUsername('');
      setPassword('');
      console.log('credentials', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          value={username}
          name="Username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
}
