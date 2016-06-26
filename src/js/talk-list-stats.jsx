import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';

function TalkListStats({ abstractsById, email }) {
  if (!email) {
    return null;
  }

  let stats = Object.keys(abstractsById).reduce((acc, id) => {
    let talk = abstractsById[id];
    if (talk.scores_a && talk.scores_a[email]) {
      switch (talk.scores_a[email]) {
        case 1:
          acc.no += 1;
          break;
        case 2:
          acc.maybe += 1;
          break;
        case 3:
          acc.yes += 1;
          break;
      }

      return acc;
    }

    acc.unrated += 1;
    return acc;
  }, { no: 0, maybe: 0, yes: 0, unrated: 0 });

  return (
    <ul id="talk-list-stats" className="list-inline">
      <li><strong>Rated</strong></li>
      <li><Glyphicon glyph="thumbs-down" className="text-danger" /> {stats.no}</li>
      <li><Glyphicon glyph="question-sign" className="text-info" /> {stats.maybe}</li>
      <li><Glyphicon glyph="thumbs-up" className="text-success" /> {stats.yes}</li>
      <li><strong>Unrated</strong></li>
      <li>{stats.unrated}</li>
    </ul>
  );
}

TalkListStats.propTypes = {
  abstractsById: PropTypes.object.isRequired
};

export default TalkListStats;