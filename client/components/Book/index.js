import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card
} from 'semantic-ui-react';
import Comments from '../Comments';

const Book = ({ book }) => {
  const { _id, title, author, comments } = book;
  return (
    <Grid>
      <Grid.Column width={4}>
        <Card>
          <Card.Content>
            <Card.Header as='h3' content={title} />
            <Card.Content content={author} />
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={12} className='commentPanel'>
        <Comments bookId={_id} comments={comments} />
      </Grid.Column>
    </Grid>
  )
};

Book.propTypes = {
  book: PropTypes.shape({
    _id: function(props, propName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object)
  })
};

export default Book;
