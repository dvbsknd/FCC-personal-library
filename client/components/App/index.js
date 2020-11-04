import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Loader,
  Divider } from 'semantic-ui-react';
import BookList from '../BookList'
import AddBookForm from '../AddBookForm'

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const formSubmit = (e) => console.log(e.target);

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
      { loading ? (<Loader active inline='centered' size='medium'>Fetching data...</Loader>) : (<BookList books={data} />) }
      <Divider hidden />
      <AddBookForm data={data} setData={setData} />
    </Container>
  );
};
