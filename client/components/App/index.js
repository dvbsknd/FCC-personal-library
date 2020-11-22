import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  Container,
  Header,
  Loader } from 'semantic-ui-react';
import BookList from '../BookList'
import Book from '../Book'

const App = () => {

  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(json => {
        // Convert the JSON string formatted value
        // of createdAt to a real Date for all the
        // comments
        return json.map(book => ({
          ...book,
          comments: book.comments
          ? book.comments.map(comment => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
          : []
        }))
      })
      .then(data => {
        console.log('Fetched all books from API', data);
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header as='h1' className='site-title'>My Books</Header>
      <Router>
        {loading
          ? (
            <Loader active inline='centered' size='medium'>
              Fetching data...
            </Loader>
          )
          : (
            <Switch>
              <Route exact={true} path='/' render={() => (
                <BookList books={books} setBooks={setBooks}/>
              )} />
              <Route path='/:id' render={({ match }) => {
                const { id } = match.params;
                const book = books.find(book => id === book._id)
                return (
                  <Book
                    book={book}
                    setBooks={setBooks}
                  />
                )}} />
            </Switch>
          )
        }
      </Router>
    </Container>
  );
};

export default App;
