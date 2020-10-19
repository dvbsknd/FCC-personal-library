import React from 'react';
import './Book.scss';

const books = [
  { id: 1, name: 'The Old Man and the Sea', author: 'Ernest Hemingway' },
  { id: 2, name: 'Guns, Germs and Steel', author: 'Jared Diamond' },
  { id: 3, name: 'Basic Economics', author: 'Thomas Sowell' },
];

export default function FoodEntry() {
  return (
    <ol>
      {books.map(book => <li key={book.id}>{book.name}: {book.author}</li>)}
    </ol>
  );
};
