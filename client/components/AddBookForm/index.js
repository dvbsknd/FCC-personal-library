import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage'

export default function AddBookForm(props) {

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

  const handleSubmit = (e) => {
    if (error) setError(null);
    setButtonLoading(true);
    fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log('[API Error]', data);
          setError(data.error);
          setButtonLoading(false);
        } else {
          props.setData(current => {
            return [...current].concat(data.document);
          });
          setButtonLoading(false);
          setValues(initialValues);
        }
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
};
