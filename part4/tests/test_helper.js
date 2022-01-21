const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlog = [
  {
    author: 'herbert',
    title: 'dune messiah',
    url: 'dune.com',
  },
  {
    author: 'frank',
    title: 'God Emperor of Dune',
    url: 'dune.com',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialBlog, blogsInDb, usersInDb };
