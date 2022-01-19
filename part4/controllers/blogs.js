const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// get all blogs
blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs.map((b) => b.toJSON()));
    })
    .catch((err) => {
      console.log('err in get', err.message);
    });
});

//get single blog by id
blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => console.log('cant find by id', err.message));
});

//post a blog
blogRouter.post('/', (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((res) => {
      response.status(201).json(res);
    })
    .catch((err) => console.log('cant add blog', err.message));
});

module.exports = blogRouter;
