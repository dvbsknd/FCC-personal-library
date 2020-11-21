'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Divider } from 'semantic-ui-react';
import BookListItem from '../BookListItem';
import AddBookForm from '../AddBookForm'

const BookList = ({ books, setBooks }) => {

  const deleteBook = bookId => {

    console.log(`Deleting book ${bookId}`);

    // Save the current state in case deletion fails and
    // we need to restore it
    const currentData = books;

    // Remove the item from the DOM immediately and restore
    // it later if deletion at the API fails
    setBooks(current => current.filter(book => book._id !== bookId));

    // Send the delete request
    fetch('/api/books', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: bookId })
    })
      .then(res => {
        if (!res.ok) throw new Error(`[API Error] ${res.status}: ${res.statusText}`)
      })
    // If there was an error, restore the original state to the DOM
    // If there wasn't the end state is already as desired so do nothing
      .catch(err => {
        console.log(err);
        console.log(`Restoring deleted book ${bookId} to the list`);
        setBooks(currentData);
      });
  };

  return (
    <>
      <Card.Group itemsPerRow={3}>
        {books.map((book) => (
          <BookListItem
            book={book}
            key={book._id}
            deleteBook={deleteBook}
            setBooks={setBooks} />
        ))}
      </Card.Group>
      <Divider hidden />
      <AddBookForm books={books} setBooks={setBooks} />
    </>
  );
};

BookList.propTypes = {
  setBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired)
};

export default BookList;
