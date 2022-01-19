//imports
const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
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
app.use(express());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;
