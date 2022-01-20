const _ = require('lodash');

blogs = [
  { author: 'jon', likes: 5 },
  { author: 'jon', likes: 1 },
  { author: 'on', likes: 5 },
  { author: 'on', likes: 5 },
  { author: 'on', likes: 5 },
  { author: 'on', likes: 50 },
  { author: 'j', likes: 25 },
  { author: 'j', likes: 5 },
  { author: 'j', likes: 5 },
  { author: 'j', likes: 5 },
  { author: 'j', likes: 5 },
];

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

let a = every.map((e) => e.map((l) => l.likes).reduce((t, a) => (t += a), 0));
const mostLikes = Math.max(...a);

console.log('likes', a);
console.log('biggest', mostLikes);
console.log('index', a.indexOf(mostLikes));
