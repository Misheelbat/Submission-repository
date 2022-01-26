import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import LoginApp from './components/LoginApp';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState({ show: false, msg: '', type: '' });
  const showError = (show = false, msg = '', type = '') => {
    setErrorMsg({ show, msg, type });
  };

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
      .catch(() => showError(true, 'could not fetch data', 'failure'));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const handleLogout = () => {
    window.localStorage.clear();
    showError(true, 'user logged out', 'success');
    setUser(null);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {errorMsg.show && <Notification showError={showError} {...errorMsg} />}
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
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {user !== null && (
        <CreateBlog setBlogs={setBlogs} blogs={blogs} showError={showError} />
      )}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
