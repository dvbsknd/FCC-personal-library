import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'semantic-ui-react';
import BookListItem from '../BookListItem';

const BookList = (props) => {

  const [deleteButton, showDeleteButton] = useState(false);

  return (
    <Card.Group itemsPerRow={3}>
      {props.books.map(book => (<BookListItem author={book.author} title={book.title} key={book._id} />))}
    </Card.Group>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    _id: function(props, propName, componentName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }))
}

export default BookList;
