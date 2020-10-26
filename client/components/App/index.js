import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './styles.scss';
import BookList from '../BookList'

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
      { loading ? (<p>Loading...</p>) : (<BookList books={data} />) }
    </Container>
  );
};
