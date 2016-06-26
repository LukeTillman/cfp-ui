import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

function TalkActions({ talk, email, onNext, onPrevious, nextDisabled, previousDisabled, onRateClick }) {
  let rating = undefined;
  let loggedIn = !!email;
  let talkSelected = !!talk;
  if (loggedIn && talkSelected && talk.scores_a) {
    rating = talk.scores_a[email];
  }

  return (
    <ButtonToolbar id="talk-actions">
      <ButtonGroup bsSize="small">
        <Button title="Previous talk" disabled={previousDisabled} onClick={onPrevious}>
          <Glyphicon glyph="chevron-left" />
        </Button>
        <Button title="Next talk" disabled={nextDisabled} onClick={onNext}>
          <Glyphicon glyph="chevron-right" />
        </Button>
      </ButtonGroup>
      <ButtonGroup bsSize="small" className="pull-right">
        <Button title="Rate NO" bsStyle={rating === 1 ? 'primary' : 'default'} disabled={!loggedIn || !talkSelected || rating === 1} onClick={() => onRateClick(1)}>
          <Glyphicon glyph="thumbs-down" />
        </Button>
        <Button title="Rate MAYBE" bsStyle={rating === 2 ? 'primary' : 'default'} disabled={!loggedIn || !talkSelected || rating === 2} onClick={() => onRateClick(2)}>
          <Glyphicon glyph="question-sign" />
        </Button>
        <Button title="Rate YES" bsStyle={rating === 3 ? 'primary' : 'default'} disabled={!loggedIn || !talkSelected || rating === 3} onClick={() => onRateClick(3)}>
          <Glyphicon glyph="thumbs-up" />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

TalkActions.propTypes = {
  talk: PropTypes.object,
  email: PropTypes.string,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  previousDisabled: PropTypes.bool.isRequired,
  onRateClick: PropTypes.func.isRequired
};

export default TalkActions;