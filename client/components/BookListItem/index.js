import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  Dimmer
 } from 'semantic-ui-react';

const BookListItem = ({ book, deleteBook }) => {

  const [deleteButton, showDeleteButton] = useState(false);
  const { _id, title, author, commentCount } = book;

  return (
    <Dimmer.Dimmable as={Card} dimmed={deleteButton} fluid={true}
      onMouseEnter={() => showDeleteButton(true)}
      onMouseLeave={() => showDeleteButton(false)}>
      <Card.Content>
        <Card.Header as="h3" className='bookTitle'>{title}</Card.Header>
        <Card.Meta className='bookAuthor'>{author}</Card.Meta>
        <Card.Meta>{commentCount} comments</Card.Meta>
        <Dimmer active={deleteButton}>
          <Button as={Link} to={`/${_id}`} aria-label='View' primary content='View' />
          <Button aria-label='Delete' negative content='Delete'
            onClick={() => deleteBook(_id)} />
        </Dimmer>
      </Card.Content>
    </Dimmer.Dimmable>
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
    commentCount: PropTypes.number.isRequired,
  }),
  deleteBook: PropTypes.func.isRequired,
};

export default BookListItem;
