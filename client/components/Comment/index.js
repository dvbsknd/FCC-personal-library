import React from 'react';
import PropTypes from 'prop-types';
import {
  Comment as KitComment
} from 'semantic-ui-react';

const Comment = ({ comment, deleteComment }) => {
  return (
    <KitComment>
      <KitComment.Content>
        <KitComment.Author as='a'>{comment.author}</KitComment.Author>
        <KitComment.Metadata>
          <span>{comment.createdAt.toLocaleString()}</span>
        </KitComment.Metadata>
        <KitComment.Text>{comment.text}</KitComment.Text>
        <KitComment.Actions>
          <a onClick={() => deleteComment(comment.id)}>Delete</a>
        </KitComment.Actions>
      </KitComment.Content>
    </KitComment>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: function(props, propName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    createdAt: PropTypes.instanceOf(Date).isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default Comment;
