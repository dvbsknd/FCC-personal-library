import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'semantic-ui-react';

const BookListItem = (props) => {

  const [deleteButton, showDeleteButton] = useState(false);

  return (
    <Card fluid={true} 
      onMouseEnter={() => showDeleteButton(true)}
      onMouseLeave={() => showDeleteButton(false)}>
      <Card.Content>
        {deleteButton && (
          <Button icon floated='right' color='red' circular basic
            onClick={() => props.deleteBook(props.bookId)}>
           <Icon name='delete' />
          </Button>
        )}
        <Card.Header className='bookTitle'>{props.title}</Card.Header>
        <Card.Meta className='bookAuthor'>{props.author}</Card.Meta>
      </Card.Content>
    </Card>
  )
};

BookListItem.propTypes = {
  bookId: function(props, propName, componentName) {
    if (!props[propName] || props[propName].length !== 24) {
      return new Error(`Expected ${propName} to exist and have a length of 24`);
    }
  },
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default BookListItem;
