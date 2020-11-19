import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Comment as suComment,
  Header,
  Loader,
} from 'semantic-ui-react';
import Comment from '../Comment';

const Comments = ({ bookId }) => {

  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/books/${bookId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  }, []);

  return (
    <suComment.Group minimal>
      <Header as='h3' dividing>
        Comments
      </Header>
      {loading ?
          (
            <Loader active inline='centered' size='medium'>
              Fetching data...
            </Loader>
          ) : (
            comments.forEach(comment => (
              <Comment
                createdDate={comment.createdDate}
                author={comment.author}
                text={comment.text}
              />
            ))
          )
      }
    </suComment.Group>
  )
};

Comments.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default Comments;
