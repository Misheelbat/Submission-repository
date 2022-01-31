import React, { useState, useEffect } from 'react';
import CreateBlog from './components/CreateBlog';
import LoginApp from './components/LoginApp';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import DisplayBlogs from './components/DisplayBlogs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showAsync } from './features/NotificationSlice';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const errMsg = useSelector(state => state.notification);
  const dispatch = useDispatch();

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
    dispatch(showAsync({ msg: 'user logged out', type: 'success' }));
    setUser(null);
  };

  const updateLikes = async newBlog => {
    try {
      const updatedBlog = await blogService.update(newBlog.id, newBlog);
      const filteredBlog = blogs.map(blog =>
        blog.id !== newBlog.id ? blog : updatedBlog
      );
      setBlogs(filteredBlog);
    } catch (error) {
      dispatch(showAsync({ msg: error.message, type: 'failure' }));
    }
  };
  const removeBlog = async newBlog => {
    try {
      const ok = window.confirm(`remove ${newBlog.title}?`);
      if (ok) {
        await blogService.deleteBlog(newBlog.id);
        setBlogs(blogs.filter(blog => blog.id !== newBlog.id));
        dispatch(showAsync({ msg: 'Blog deleted', type: 'success' }));
      }
    } catch (error) {
      dispatch(showAsync({ msg: error.message, type: 'failure' }));
    }
  };

  return (
    <div>
      {errMsg.show && <Notification />}
      <h2>blogs</h2>
      {user === null ? (
        <Togglable buttonLabel="login" buttonEnd="cancel">
          <LoginApp setUser={setUser} />
        </Togglable>
      ) : (
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <br />
      {user !== null && (
        <Togglable buttonLabel="create new blog" buttonEnd="cancel">
          <CreateBlog setBlogs={setBlogs} blogs={blogs} />
        </Togglable>
      )}
      {user !== null && (
        <DisplayBlogs
          blogs={blogs}
          removeBlog={removeBlog}
          updateLikes={updateLikes}
        />
      )}
    </div>
  );
};

export default App;
