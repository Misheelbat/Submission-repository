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

module.exports = {
  dummy,
  totalLikes,
};
