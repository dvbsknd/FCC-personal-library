const { ObjectID } = require('mongodb');

const array = ['One', 'Two', 'Three'];

const comments = array.map(item => ({
  id: new ObjectID().toString(),
  author: `Author ${item}`,
  text: `This is a test comment ${item} of total: ${array.length}`,
  createdAt: new Date()
}));

const books = array.map(item => ({
  _id: new ObjectID().toString(),
  title: `Test ${item}`,
  author: `Author ${item}`,
  comments
}));

module.exports = {
  books,
  comments
}
