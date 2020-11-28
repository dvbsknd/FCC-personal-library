const validateResponse = (response) => {
  if (response.ok) {
    return response.json()
      .then(json => {
        return json
      });
  }
  else throw new Error(response.status + ' ' + response.statusText);
};

const handleError = (err) => {
  console.log('[API Error]', err);
  throw err;
};

const getBooks = () => {
  return fetch('/api/books')
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
  return fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookDetails)
  })
    .then(validateResponse)
    .then(json => json.document)
    .catch(handleError);
};

const deleteBook = (bookId) => {
  return fetch('/api/books', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: bookId })
  })
    .then(validateResponse)
    .then(json => json.document)
    .catch(handleError);
};

const deleteComment = (commentId) => {
  return fetch('/api/comments', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: commentId
    })
  })
    .then(validateResponse)
    .then(json => {
      const { commentId } = json;
      return commentId;
    })
    .catch(handleError);
};

const addComment = (bookId, comment) => {
  return fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bookId,
      comment
    })
  })
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
  getBooks,
  addComment,
  deleteComment
};
