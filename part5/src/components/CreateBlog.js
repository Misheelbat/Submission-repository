import React, { useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { showAsync } from '../features/NotificationSlice';

export default function CreateBlog({ setBlogs, blogs }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setBlogs({ title: '', author: '', url: '' });
      dispatch(showAsync({ msg: 'created blog post', type: 'success' }));
    } catch (error) {
      dispatch(showAsync({ msg: 'could not blog post', type: 'failure' }));
      console.log('cannot post new blog', error.message);
    }
  };

  return (
    <div>
      <h1>create new Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button id="save" type="submit">
          create
        </button>
      </form>
    </div>
  );
}
