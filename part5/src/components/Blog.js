import React, { useState } from 'react';

export default function Blog({ blog, updateLikes, removeBlog }) {
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
    updateLikes(newBlog);
    setBlogs(newBlog);
  };
  const handleDelete = () => {
    removeBlog(blog);
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
          <button onClick={handleDelete}>remove</button>
        </div>
      )}
    </div>
  );
}
