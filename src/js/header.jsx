import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import md5 from 'md5';

import { signIn, signOut } from './redux-actions';

// Needs the CFP Logo image
const logoImageUrl = require('cs_logo_white.png');

class Header extends Component {
  render() {
    let userComponent;
    if (this.props.email) {
      let hash = md5(this.props.email);
      let imageUrl = `https://robohash.org/${hash}?gravatar=hashed&set=any&bgset=any`;

      let dropdownTitle = (
        <span>
          <img src={imageUrl} id="gravatar" />
          {this.props.email}
        </span>
      );
      userComponent = (
        <NavDropdown title={dropdownTitle}>
          <MenuItem onSelect={e => this.props.signOut()}>Sign Out</MenuItem>
        </NavDropdown>
      );
    } else {
      userComponent = <NavItem onSelect={e => this.props.signIn('luke.tillman@datastax.com')}>Sign In</NavItem>;
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logoImageUrl}/> CFP Review
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
}

// Prop validation
Header.propTypes = {
  email: PropTypes.string,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

// Map redux state to props
function mapStateToProps(state) {
  const { email } = state;
  return { email };
}

// The component
export default connect(mapStateToProps, { signIn, signOut })(Header);