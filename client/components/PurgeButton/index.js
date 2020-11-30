import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';
import API from '../../services/api';

const PurgeButton = ({ setBooks }) => {

  const purgeBooks = () => {
    console.log(`Deleting all books`);
    API.purgeBooks()
      .then(setBooks())
      .catch(console.log);
  };

  return (
    <>
      <Container fluid textAlign='right'>
      <Button basic color='red' onClick={purgeBooks}>
        Delete all...
      </Button>
      </Container>
    </>
  );
};

PurgeButton.propTypes = {
  setBooks: PropTypes.func.isRequired,
};

export default PurgeButton;
