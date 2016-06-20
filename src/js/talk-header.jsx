import React, { Component, PropTypes } from 'react';

function TalkHeader({ talk }) {
  if (!talk) {
    return null;
  }

  let authorsList = Object.keys(talk.authors).map(email => talk.authors[email]).join(', ');

  return (
    <div id="talk-header">
      <h3>{talk.title}</h3>
      <p>
        <strong>{authorsList}</strong> &#8226; {talk.company}<br />
        <small><em>{talk.jobtitle}</em></small>
      </p> 
    </div>
  );
}

// Prop validation
TalkHeader.propTypes = {
  talk: PropTypes.object
};

export default TalkHeader;