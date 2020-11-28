import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Container,
  Header,
  Loader } from 'semantic-ui-react';
import Routes from '../Routes'
import API from '../../services/api';

const App = () => {

  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getBooks()
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header as='h1' className='site-title'>My Books</Header>
      <Loader active={loading} inline='centered' size='medium'>
        Fetching data...
      </Loader>
      {!loading && (
        <BrowserRouter>
          <Routes books={books} setBooks={setBooks} />
        </BrowserRouter>
      )}
    </Container>
  );
};

export default App;
