import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  Container,
  Header } from 'semantic-ui-react';
import BookList from '../BookList'
import Book from '../Book'

export default function App() {

  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header as='h1' className='site-title'>My Books</Header>
      <Router>
        <Switch>
          <Route exact={true} path='/' render={() => (
            <BookList loading={loading} books={books} setBooks={setBooks}/>
          )} />
          <Route path='/:id' render={({ match }) => {
            console.log(match);
            return (
              <Book loading={loading} bookId={match.params.id} books={books} />
            )}} />
        </Switch>
      </Router>
    </Container>
  );
}
