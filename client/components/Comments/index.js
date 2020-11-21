import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Comment as KitComment,
  Header,
  Form
} from 'semantic-ui-react';
import Comment from '../Comment';
import ObjectID from 'bson-objectid';

const Comments = ({ comments }) => {

  const initialState = { name: '', comment: ''};

  const [currentComments, setCurrentComments] = useState(comments);
  const [commentContent, setCommentContent] = useState(initialState);

  const updateValue = (e) => {
    setCommentContent({ ...commentContent, [e.target.name]: e.target.value });
  };

  const addComment = () => {
    console.log(commentContent);
    setCurrentComments(currentComments.concat({
      id: new ObjectID().toHexString(),
      createdAt: new Date().toString(),
      author: commentContent.name,
      text: commentContent.comment
    }));
    setCommentContent(initialState);
    // Send a post request to the API with the
    // comment ID and expect it to return a confirmation
    // Then, update the App's state by adding the
    // comment
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
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))
        : (<p>No comment.</p>)
      }
      <Header as='h3' dividing>Add a Comment</Header>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Input
            name='name'
            label='Your name'
            placeholder='Full name'
            width={6}
            onChange={updateValue}
            value={commentContent.name}
          />
          <Form.TextArea
            name='comment'
            label='Comment'
            placeholder='Tell us what you think...'
            width={10}
            onChange={updateValue}
            value={commentContent.comment}
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
