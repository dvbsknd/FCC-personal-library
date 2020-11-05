import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function AddBookForm(props) {
  const [values, setValues] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(vals => {
      vals[name] = value
      return vals;
    });
  };

  const handleSubmit = (e) => {
    const { title, author } = values;
    const book = { title, author };
    console.log(book);
    setButtonLoading(true);
    fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        props.setData(current => {
          console.log(data.document);
          return [...current].concat(data.document);
        });
        setButtonLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Book Title</label>
        <input name='title' placeholder='Book title' onChange={handleInput} />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input name='author' placeholder='Author name' onChange={handleInput} />
      </Form.Field>
      {buttonLoading
        ? <Button loading>Loading</Button>
        : <Button type='submit'>Submit</Button>
      }
    </Form>
  );
};
