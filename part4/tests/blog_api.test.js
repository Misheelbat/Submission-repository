const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialNotes = [
  {
    author: 'herbert',
    title: 'dune messiah',
  },
  {
    author: 'frank',
    title: 'God Emperor of Dune',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialNotes[0]);
  await blogObject.save();
  blogObject = new Blog(initialNotes[1]);
  await blogObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blog', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((b) => b.author);
  expect(contents).toContain('frank');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'will wright',
    title: 'cradle',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const authors = response.body.map((b) => b.author);

  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(authors).toContain('will wright');
});

afterAll(() => {
  mongoose.connection.close();
});
