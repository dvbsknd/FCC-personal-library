import React from 'react';
import PropTypes from 'prop-types';
import {
  Comment as KitComment,
  Header
} from 'semantic-ui-react';
import Comment from '../Comment';

const Comments = ({ comments, setBooks }) => {

  const deleteComment = (commentId) => {
    console.log(commentId);
    setBooks();
    // Send a delete request to the API with the
    // comment ID and expect it to return a confirmation
    // Then, update the App's state by removing the
    // comment from the parent book, which should re-render
  }

  return (
    <KitComment.Group minimal>
      <Header as='h3' dividing>
        Comments
      </Header>
      {comments
        ? comments.map((comment,) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))
        : (<p>No comment.</p>)
      }
    </KitComment.Group>
  )
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired),
  setBooks: PropTypes.func.isRequired,
};

export default Comments;
