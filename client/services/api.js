const dispatch = (endpoint, method, payload) => {
  return fetch(`/api/${endpoint}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
};

const validateResponse = (response) => {
  if (response.ok) {
    return response.json()
  }
  else throw new Error(response.status + ' ' + response.statusText);
};

const handleError = (err) => {
  console.log('[API Error]', err);
  throw err;
};

const getBooks = () => {
  return dispatch('books', 'get')
    .then(validateResponse)
    .then(json => {
      // Convert the JSON string formatted value
      // of createdAt to a real Date for all the
      // comments
      return json.map(book => ({
        ...book,
        comments: book.comments
        ? book.comments.map(comment => ({
          ...comment,
          createdAt: new Date(comment.createdAt)
        }))
        : []
      }))
    })
    .catch(handleError);
};

const addBook = (bookDetails) => {
  return dispatch('books', 'post', bookDetails)
    .then(validateResponse)
    .catch(handleError);
};

const deleteBook = (bookId) => {
  return dispatch(`books/${bookId}`, 'delete', { _id: bookId })
    .then(validateResponse)
    .then(json => json.document)
    .catch(handleError);
};

const purgeBooks = () => {
  return dispatch(`books`, 'delete')
    .then(validateResponse)
    .then(json => json.document)
    .catch(handleError);
};

const deleteComment = (commentId) => {
  return dispatch('comments', 'delete', { _id: commentId })
    .then(validateResponse)
    .then(json => json._id)
    .catch(handleError);
};

const addComment = (bookId, comment) => {
  return dispatch('comments', 'post', { bookId, comment })
    .then(validateResponse)
    .then(json => {
      const { comment } = json;
      return {
        ...comment,
          createdAt: new Date(comment.createdAt)
      }
    })
    .catch(handleError);
};

export default {
  addBook,
  deleteBook,
  purgeBooks,
  getBooks,
  addComment,
  deleteComment
};
