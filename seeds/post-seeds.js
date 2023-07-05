const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    content: 'This is my first post.',
    date_created: new Date().toString(),
    user_id: 1
  },
  {
    title: 'Second Post',
    content: 'This is my second post.',
    date_created: new Date().toString(),
    user_id: 2
  },
  {
    title: 'Third Post',
    content: 'This is my third post.',
    date_created: new Date().toString(),
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;