import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function AddBookForm(props) {

  const initialValues = { title: '', author: '' }
  const [values, setValues] = useState(initialValues);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newValues = {};
    newValues[name] = value;
    setValues({ ...values, ...newValues });
  };

  const handleSubmit = (e) => {
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
        props.setData(current => {
          return [...current].concat(data.document);
        });
        setButtonLoading(false);
        setValues(initialValues);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Book Title</label>
        <input type='text' name='title' value={values.title} placeholder='Book title' onChange={handleInput} />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input type='text' name='author' value={values.author} placeholder='Author name' onChange={handleInput} />
      </Form.Field>
      {buttonLoading
        ? <Button loading>Loading</Button>
        : <Button type='submit'>Submit</Button>
      }
    </Form>
  );
};
