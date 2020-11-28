import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage'
import API from '../../services/api';

const AddBookForm = ({ setBooks }) => {

  const initialValues = { title: '', author: '' }
  const [values, setValues] = useState(initialValues);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newValues = {};
    newValues[name] = value;
    setValues({ ...values, ...newValues });
  };

  const handleSubmit = () => {
    if (error) setError(null);
    setButtonLoading(true);
    API.addBook(values)
      .then(book => {
        setBooks(current => {
          return [...current].concat(book);
        });
        setButtonLoading(false);
        setValues(initialValues);
      })
      .catch(err => {
        const { message } = err;
        setError(message);
        setButtonLoading(false);
      });
  };

  return (
    <>
      {error ? (<ErrorMessage label={'Something ain\'t right'}  message={error} />) : error}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor='title'>Book Title</label>
          <input type='text' id='title' name='title' value={values.title} placeholder='Book title' onChange={handleInput} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' name='author' value={values.author} placeholder='Author name' onChange={handleInput} />
        </Form.Field>
        {buttonLoading
          ? <Button loading>Loading</Button>
          : <Button type='submit'>Submit</Button>
        }
      </Form>
    </>
  );
}

AddBookForm.propTypes = {
  setBooks: PropTypes.func.isRequired
};

export default AddBookForm;
