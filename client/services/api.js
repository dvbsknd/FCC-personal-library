const dispatch = (endpoint, method, payload) => {

  const formData = payload ?  Object.keys(payload).map((key) => {
    if (payload[key] !== undefined) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
    }
  }).join('&') : null;

  return fetch(`/api/${endpoint}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
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
};

const getBooks = () => {
  return dispatch('books', 'get')
    .then(validateResponse)
    .then(json => {
      if (json.length < 1) throw new Error('No books!');
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
  return dispatch(`books/${bookId}`, 'post', comment)
    .then(validateResponse)
    .then(() => getComments(bookId))
    .catch(handleError);
};

const getComments = (bookId) => {
  return dispatch(`books/${bookId}`, 'get')
    .then(validateResponse)
    .then((json) => {
      return json.comments.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      }));
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
