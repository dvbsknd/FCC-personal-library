import React from 'react';
import { Card } from 'semantic-ui-react';

export default function BookList(props) {
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
