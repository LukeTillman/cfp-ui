import React, { Component, PropTypes } from 'react';
import { Panel, Label } from 'react-bootstrap';

function TalkDetails({ talk, className }) {
  if (talk === null) {
    return null;
  }

  let authorsList = Object.keys(talk.authors).map(email => talk.authors[email]).join(', ');

  return (
    <Panel id="talk-details">
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
    </Panel>
  );
}

// Prop validation
TalkDetails.propTypes = {
  talk: PropTypes.object,
  className: PropTypes.string
};

export default TalkDetails;