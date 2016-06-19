import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

function TalkActions() {
  return (
    <ButtonToolbar id="talk-actions">
      <ButtonGroup>
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>No</Button>
        <Button>Maybe</Button>
        <Button>Yes</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default TalkActions;