import React, { Component, PropTypes } from 'react';
import md5 from 'md5';

function UserImage({ email, className }) {
  if (!email) return null;
  
  let hash = md5(email);
  let imageUrl = `https://robohash.org/${hash}?gravatar=hashed&set=any&bgset=any`;

  let imageClass = 'gravatar';
  if (className) {
    imageClass += ` ${className}`;
  }

  return (
    <img src={imageUrl} alt={email} className={imageClass} />
  );
}

// Prop validation
UserImage.propTypes = {
  email: PropTypes.string,
  className: PropTypes.string
};

export default UserImage;