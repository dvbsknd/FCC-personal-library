import React, { useState, useEffect } from 'react';
import './styles.scss';
import BookList from '../BookList'

const books = [
  { id: 1, name: 'The Old Man and the Sea', author: 'Ernest Hemingway' },
  { id: 2, name: 'Guns, Germs and Steel', author: 'Jared Diamond' },
  { id: 3, name: 'Basic Economics', author: 'Thomas Sowell' },
];

export default function App() {
  const [data, setData] = useState(books);

  useEffect(() => {
    const newBook = { id: 4, name: 'Buns, Berms and Beers', author: 'City Slicker' };
    const newBooks = books.concat(newBook);
    console.log(newBooks);
    setData(newBooks);
  }, []);

  return (
    <BookList books={data} />
  );
};
