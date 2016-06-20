import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

function TalkActions({ onNext, onPrevious }) {
  return (
    <ButtonToolbar id="talk-actions">
      <ButtonGroup bsSize="small">
        <Button title="Previous talk" onClick={onPrevious}>
          <Glyphicon glyph="chevron-left" />
        </Button>
        <Button title="Next talk" onClick={onNext}>
          <Glyphicon glyph="chevron-right" />
        </Button>
      </ButtonGroup>
      <ButtonGroup bsSize="small" className="pull-right">
        <Button title="Rate NO">
          <Glyphicon glyph="thumbs-down" />
        </Button>
        <Button title="Rate MAYBE">
          <Glyphicon glyph="question-sign" />
        </Button>
        <Button title="Rate YES">
          <Glyphicon glyph="thumbs-up" />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

TalkActions.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default TalkActions;