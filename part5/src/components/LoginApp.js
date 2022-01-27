import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

export default function LoginApp({ setUser, showError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

      blogService.setToken(user.token);
      showError(true, 'logged in', 'success');
      setUser(user);
    } catch (error) {
      showError(true, 'wrong username or password', 'failure');
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
          type="text"
          value={username}
          name="Username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}
