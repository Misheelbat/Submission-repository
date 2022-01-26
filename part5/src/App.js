import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginApp from './components/LoginApp';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('credentials', error.message);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <LoginApp
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div>{user.name} logged in</div>
      )}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
