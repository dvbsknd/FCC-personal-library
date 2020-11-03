import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function AddBookForm(props) {
  return (
    <Form>
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
