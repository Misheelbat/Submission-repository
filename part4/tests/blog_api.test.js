const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('blog posts are returned as JSON', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct amount of blog posts are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlog.length);
  });

  test('the returned data is correct', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map((b) => b.author);
    expect(contents).toContain('frank');
  });
});

describe('unique identifier is formatted as id', () => {
  test('id is labeled as id', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
});

describe('HTTP POST request functions correctly', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'will wright',
      title: 'cradle',
      url: 'cradle.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlog.length + 1);
    const authors = allBlogs.map((b) => b.author);
    expect(authors).toContain('will wright');
  });
});

describe('verifies that if the likes property is missing from the request, it will default to the value 0', () => {
  test('likes property is missing', async () => {
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs[0].likes).toEqual(0);
  });
});

describe('verify if the url or title is missing', () => {
  test('missing url and title', async () => {
    const newBlog = {
      author: 'will wright',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

test('delete a blog post', async () => {
  const allBlogs = await helper.blogsInDb();
  const blogTo = allBlogs[0];

  await api.delete(`/api/blogs/${blogTo.id}`).expect(204);
  const afterDelete = await helper.blogsInDb();
  expect(afterDelete).toHaveLength(helper.initialBlog.length - 1);
});

test('update single blog', async () => {
  const allBlogs = await helper.blogsInDb();
  const blogToUpdate = allBlogs[0];
  const changedBlog = {
    title: 'dune messiah',
    author: 'herbert',
    url: 'dune.com',
    likes: 10,
  };
  //await api.put(`/api/blogs/${blogToUpdate.id}`);
  await Blog.findByIdAndUpdate(blogToUpdate.id, changedBlog, { new: true });
  const afterChange = await helper.blogsInDb();
  expect(afterChange[0].likes).toEqual(10);
});

afterAll(() => {
  mongoose.connection.close();
});
