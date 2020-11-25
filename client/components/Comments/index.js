import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Comment as KitComment,
  Header,
  Form
} from 'semantic-ui-react';
import Comment from '../Comment';
import ErrorMessage from '../ErrorMessage';
import API from '../../services/api';
import { ObjectID } from '../../services/utils';

const Comments = ({ bookId, comments }) => {

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

    API.addComment(bookId, comment)
      .then(returnedComment => {
        setCurrentComments(currentComments.concat(returnedComment));
        setCommentValues({});
      })
      .catch(err => setError({
        label: 'Couldn\'t save comment',
        message: err.toString()
      }));

  };

  const deleteComment = (commentId) => {

    API.deleteComment(commentId)
      .then(_id => setCurrentComments(
        currentComments.filter(c => c._id !== _id)))
      .catch(err => setError({
        label: 'Deleting failed',
        message: err.toString()
      }));

  };

  return (
    <KitComment.Group minimal>
      <Header as='h2' dividing>Comments</Header>
      {currentComments
        ? currentComments.map((comment) => (
          <Comment
            key={comment._id || ObjectID()}
            comment={comment}
            deleteComment={() => deleteComment(comment._id)}
          />
        ))
        : (<p>No comment.</p>)
      }
      <Header as='h3' dividing>Add a Comment</Header>
      {error ? (<ErrorMessage label={error.label}  message={error.message} />) : error}
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
  bookId: function(props, propName) {
    if (props[propName] && props[propName].length !== 24) {
      return new Error(`Expected ${propName} to exist and have a length of 24`);
    }
  },
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    }).isRequired)
};

export default Comments;
