import React, { useState, useEffect } from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import BookList from '../BookList'
import AddBookForm from '../AddBookForm'

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header as='h1'>My Books</Header>
      { loading ? (<Loader active inline='centered' size='medium' />) : (<BookList books={data} />) }
      <AddBookForm />
    </Container>
  );
};
