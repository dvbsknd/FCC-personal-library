import React from 'react';
import PropTypes from 'prop-types';
import {
  Comment as suComment
} from 'semantic-ui-react';

const Comment = ({ comment, deleteComment }) => {
  return (
    <suComment>
      <suComment.Content>
        <suComment.Author as='a'>{comment.author}</suComment.Author>
        <suComment.Metadata>
          <span>{comment.createdAt}</span>
        </suComment.Metadata>
        <suComment.Text>{comment.text}</suComment.Text>
        <suComment.Actions>
          <a onClick={() => deleteComment(comment.id)}>Delete</a>
        </suComment.Actions>
      </suComment.Content>
    </suComment>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default Comment;
