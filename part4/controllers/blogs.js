const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// get all blogs
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs.map((b) => b.toJSON()));
});

//get single blog by id
blogRouter.get('/:id', async (request, response) => {
  const blog = Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//post a blog
blogRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

// delete a blog
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

//update by id
blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blogToUpdate = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToUpdate,
    {
      new: true,
    }
  );
  response.json(updatedBlog);
});

module.exports = blogRouter;
