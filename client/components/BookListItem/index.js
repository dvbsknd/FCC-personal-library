import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

const BookListItem = ({ book, deleteBook }) => {

  const [deleteButton, showDeleteButton] = useState(false);
  const { _id, title, author } = book;

  return (
    <Card fluid={true}
      onMouseEnter={() => showDeleteButton(true)}
      onMouseLeave={() => showDeleteButton(false)}>
      <Card.Content>
        {deleteButton && (
          <Button icon floated='right' color='red' circular basic
            aria-label='Delete'
            onClick={() => deleteBook(_id)}>
            <Icon name='delete' />
          </Button>
        )}
        <Card.Header className='bookTitle'>{title}</Card.Header>
        <Card.Meta className='bookAuthor'>{author}</Card.Meta>
        <Link to={`/${_id}`}>Comments</Link>
      </Card.Content>
    </Card>
  )
};

BookListItem.propTypes = {
  book: PropTypes.shape({
    _id: function(props, propName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
  deleteBook: PropTypes.func.isRequired,
};

export default BookListItem;
