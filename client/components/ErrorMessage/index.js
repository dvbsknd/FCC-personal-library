import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = (props) => {
  return (
    <Message floating negative>
      <Message.Header>{props.label}</Message.Header>
      <p>{props.message}</p>
    </Message>
  )
};

export default ErrorMessage;
