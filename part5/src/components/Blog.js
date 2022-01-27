import React, { useState } from 'react';
import blogService from '../services/blogs';

export default function Blog({ blog }) {
  const [toggle, setToggle] = useState(false);
  const [blogs, setBlogs] = useState(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    blogService.update(blog.id, newBlog);
    setBlogs(newBlog);
  };

  return (
    <div style={blogStyle}>
      {blogs.title} {blogs.author}
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'hide' : 'view'}
      </button>
      {toggle && (
        <div>
          <div>{blogs.url}</div>
          <div>
            {blogs.likes} <button onClick={handleLikes}>likes</button>
          </div>
          <div>{blogs.user.username}</div>
        </div>
      )}
    </div>
  );
}
