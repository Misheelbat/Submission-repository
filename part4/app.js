//imports
const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

// connect to database
mongoose
  .connect(config.MONGODB_URI)
  .then((res) => {
    logger.info('connected to mongoDB');
  })
  .catch((err) => {
    logger.error('error connecting', err.message);
  });

// app use
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use(middleware.errorHandler);

module.exports = app;
