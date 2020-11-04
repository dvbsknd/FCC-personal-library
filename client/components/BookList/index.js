import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const BookList = (props) => {
  return (
    <Card.Group itemsPerRow={3}>
      {props.books.map(book => {
        return (
          <Card key={book._id} fluid={true}>
            <Card.Content>
              <Card.Header className='bookTitle'>{book.title}</Card.Header>
              <Card.Meta className='bookAuthor'>{book.author}</Card.Meta>
            </Card.Content>
          </Card>
        )
      })}
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
