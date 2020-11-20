import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card
} from 'semantic-ui-react';
import Comments from '../Comments';

const Book = ({ book, setBooks }) => {
  const { title, author, comments } = book;
  return (
    <Grid columns={2}>
      <Grid.Column width={3}>
        <Card>
          <Card.Content header={title} />
          <Card.Content description={author} />
        </Card>
      </Grid.Column>
      <Grid.Column width={9}>
        <Comments comments={comments} setBooks={setBooks} />
      </Grid.Column>
    </Grid>
  )
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object)
  }),
  setBooks: PropTypes.func.isRequired
};

export default Book;
