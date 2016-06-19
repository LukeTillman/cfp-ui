import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import GeminiScrollbar from 'react-gemini-scrollbar';
import moment from 'moment';

import UserImage from './user-image';

function TalkComment({ created, email, body }) {
  return (
    <li>
      <UserImage email={email} className="pull-left" />
      <strong>{email}</strong> <span className="text-muted">{moment(created).fromNow()}</span><br/>
      {body}
    </li>
  );
}

function TalkDetails({ talk, comments }) {
  if (talk === null) {
    return null;
  }

  if (!comments) {
    comments = [];
  }

  let authorsList = Object.keys(talk.authors).map(email => talk.authors[email]).join(', ');

  return (
    <div id="talk-details-main">
      <GeminiScrollbar>
        <h3>{talk.title}</h3>
        <p>
          <strong>{authorsList}</strong> &#8226; {talk.company}<br />
          <small><em>{talk.jobtitle}</em></small>
        </p> 
        <p>{talk.body}</p>
        
        <br/>

        <h4>Bio</h4>
        <p>{talk.bio}</p>
        
        <p className="text-right">
          <Label bsStyle="info">{talk.tracks}</Label>
        </p>

        <br/>

        <h4>Comments</h4>
        <ul className="talk-comments list-unstyled">
          {comments.map(c => <TalkComment {...c} key={c.id} />)}
        </ul>
      </GeminiScrollbar>
    </div>
  );
}

// Prop validation
TalkDetails.propTypes = {
  talk: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default TalkDetails;