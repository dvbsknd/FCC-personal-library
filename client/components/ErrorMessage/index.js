import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const ErrorMessage = (props) => {
  return (
    <Message floating negative>
      <Message.Header>{props.label}</Message.Header>
      <p>{props.message}</p>
    </Message>
  )
};

ErrorMessage.propTypes = {
  label: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
