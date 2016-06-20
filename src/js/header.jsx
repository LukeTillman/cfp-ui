import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import UserImage from './user-image';

// Needs the CFP Logo image
const logoImageUrl = require('cs_logo_white.png');

// The header is just a function of its props so define as a stateless component
function Header({ email, signIn, signOut}) {
  let userComponent;
  if (email) {
    let dropdownTitle = (
      <span>
        <UserImage email={email} />
        {email}
      </span>
    );

    userComponent = (
      <NavDropdown title={dropdownTitle}>
        <MenuItem onSelect={e => signOut()}>Sign Out</MenuItem>
      </NavDropdown>
    );
  } else {
    userComponent = <NavItem onSelect={e => signIn('luke.tillman@datastax.com')}>Sign In</NavItem>;
  }

  return (
    <Navbar fixedTop fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <img src={logoImageUrl}/> Presentations Review
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav navbar pullRight>
          {userComponent}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Prop validation
Header.propTypes = {
  email: PropTypes.string,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

// The component
export default Header;