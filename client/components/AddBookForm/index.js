import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function AddBookForm(props) {

  const handleSubmit = (e) => {
    console.log(e.target);
    props.setData([...props.data].concat({ _id: 'test', title: 'test', author: 'test' }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Book Title</label>
        <input placeholder='Book title' />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input placeholder='Author name' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  );
};
