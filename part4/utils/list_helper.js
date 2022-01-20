const _ = require('lodash/array');

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  } else {
    return 0;
  }
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let total = blogs
    .map((blog) => blog.likes)
    .reduce((tot, likes) => {
      tot += likes;
      return tot;
    }, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  const numberOfLikes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...numberOfLikes);
  const index = numberOfLikes.indexOf(mostLikes);
  return blogs[index];
};

const mostBlog = (blogs) => {
  const author = blogs.map((b) => b.author);
  const all = _.uniq(author);

  const every = [];
  for (i in all) {
    const single = blogs.filter((b) => b.author === all[i]);
    every.push(single);
  }
  let larg = every.reduce(
    (max, el, i, arr) => (el.length > arr[max].length ? i : max),
    0
  );

  const mostLikedAuthor = {
    author: all[larg],
    blogs: every[larg].length,
  };
  return mostLikedAuthor;
};
const mostLikes = (blogs) => {
  const author = blogs.map((b) => b.author);
  const all = _.uniq(author);
  const every = [];
  for (i in all) {
    const single = blogs.filter((b) => b.author === all[i]);
    every.push(single);
  }
  let arrayOfLikes = every.map((e) =>
    e.map((l) => l.likes).reduce((t, a) => (t += a), 0)
  );
  const mostLikes = Math.max(...arrayOfLikes);
  const likedAuthor = {
    author: all[arrayOfLikes.indexOf(mostLikes)],
    likes: mostLikes,
  };
  return likedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
