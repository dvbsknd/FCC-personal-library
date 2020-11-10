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
          <Button icon floated='right' size='tiny' color='red' circular basic>
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
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default BookListItem;
