import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  Loader
} from 'semantic-ui-react';

const Book = ({ books, bookId, loading }) => {
  const book = books ? books.find(book => bookId.toString() === book._id) : null;
  return (
    loading ? (
      <Loader active inline='centered' size='medium'>Fetching data...</Loader>
    ) : (
      <Grid columns={2}>
        <Grid.Column width={3}>
          <Header>{book.title}
            <Header.Subheader>{book.author}</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={9}>
          Comments to come...
        </Grid.Column>
      </Grid>
    )
  )
};

Book.propTypes = {
  books: PropTypes.arrayOf(PropTypes.PropTypes.object),
  bookId: PropTypes.string.isRequired,
  find: PropTypes.func,
  loading: PropTypes.bool.isRequired
};

export default Book;
