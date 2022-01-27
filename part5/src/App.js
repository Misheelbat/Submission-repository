import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import LoginApp from './components/LoginApp';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState({ show: false, msg: '', type: '' });

  const showError = (show = false, msg = '', type = '') => {
    setErrorMsg({ show, msg, type });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    showError(true, 'user logged out', 'success');
    setUser(null);
  };

  return (
    <div>
      {errorMsg.show && <Notification showError={showError} {...errorMsg} />}
      <h2>blogs</h2>
      {user === null ? (
        <Togglable buttonLabel="login" buttonEnd="cancel">
          <LoginApp setUser={setUser} showError={showError} />
        </Togglable>
      ) : (
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <br />
      {user !== null && (
        <Togglable buttonLabel="create new blog" buttonEnd="cancel">
          <CreateBlog setBlogs={setBlogs} blogs={blogs} showError={showError} />
        </Togglable>
      )}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
