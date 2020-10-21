import React from 'react';

export default function BookList(props) {
  return (
    <ol>
      {props.books.map(book => <li key={book.id}>{book.name}: {book.author}</li>)}
    </ol>
  );
};
