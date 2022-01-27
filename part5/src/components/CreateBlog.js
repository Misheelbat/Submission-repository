import React, { useState } from 'react';
import blogService from '../services/blogs';

export default function CreateBlog({ setBlogs, blogs, showError }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setBlogs({ title: '', author: '', url: '' });
      showError(true, 'created blog post', 'success');
    } catch (error) {
      showError(true, 'could not create blog', 'failure');
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
            type="text"
            value={newBlog.title}
            onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
