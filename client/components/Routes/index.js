import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch
} from 'react-router-dom';
import BookList from '../BookList'
import Book from '../Book'

const Routes = ({ books, setBooks }) => {

  return (
    <div>
      <Switch>
        <Route exact={true} path='/' >
          <BookList books={books} setBooks={setBooks}/>
        </Route>
        <Route path='/:id' render={({ match }) => {
          const { id } = match.params;
          const book = books.find(book => id === book._id)
          return (
            <Book book={book} setBooks={setBooks}
            />
          )}} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  setBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string,
      title: PropTypes.string.isRequired
    }).isRequired)
};

export default Routes;
