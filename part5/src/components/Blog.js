import React from 'react';

export default function Blog({ blog }) {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}
