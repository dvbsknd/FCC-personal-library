import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Comment as KitComment,
  Header,
  Form
} from 'semantic-ui-react';
import Comment from '../Comment';
import ErrorMessage from '../ErrorMessage';

const Comments = ({ comments }) => {

  const [currentComments, setCurrentComments] = useState(comments);
  const [commentValues, setCommentValues] = useState({});
  const [error, setError] = useState(null);

  const updateValue = (e) => {
    setCommentValues({ ...commentValues, [e.target.name]: e.target.value });
  };

  const addComment = () => {
    const comment = {
      createdAt: new Date(),
      author: commentValues.name,
      text: commentValues.comment
    };

    console.log(comment);

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(response.status + ' ' + response.statusText);
      })
      .then(data => {
          console.log('[Comment Added]', data);
      })
      .catch(err => {
          console.log('[API Error]', err);
          setError(err.toString());
      });

    setCurrentComments(currentComments.concat(comment));
    setCommentValues({});
  };

  const deleteComment = (commentId) => {
    console.log(commentId);
    // Send a delete request to the API with the
    // comment ID and expect it to return a confirmation
    // Then, update the App's state by removing the
    // comment from the parent book, which should re-render
  };

  return (
    <KitComment.Group minimal>
      <Header as='h2' dividing>Comments</Header>
      {currentComments
        ? currentComments.map((comment,) => (
          <Comment
            key={comment.id || Number(comment.createdAt.valueOf())}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))
        : (<p>No comment.</p>)
      }
      <Header as='h3' dividing>Add a Comment</Header>
      {error ? (<ErrorMessage label={'Saving comment failed'}  message={error} />) : error}
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Input
            name='name'
            label='Your name'
            placeholder='Full name'
            width={6}
            onChange={updateValue}
            value={commentValues.name || ''}
          />
          <Form.TextArea
            name='comment'
            label='Comment'
            placeholder='Tell us what you think...'
            width={10}
            onChange={updateValue}
            value={commentValues.comment || ''}
          />
        </Form.Group>
        <Form.Button>Add</Form.Button>
      </Form>
    </KitComment.Group>
  )
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired)
};

export default Comments;
