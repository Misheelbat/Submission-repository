import React from 'react';
import Blog from './Blog';

export default function DisplayBlogs({ blogs, updateLikes, removeBlog }) {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
}
