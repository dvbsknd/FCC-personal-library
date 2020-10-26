import React from 'react';

export default function BookList(props) {
  return (
    <ol>
      {props.books.map(book => <li key={book._id}>{book.title}: {book.author}</li>)}
    </ol>
  );
};
