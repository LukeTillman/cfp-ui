import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

import { signIn, signOut, dismissError } from './redux-actions';

import Header from './header';
import TalkList from './talk-list';

class App extends Component {
  render() {
    const { email, signIn, signOut, errorMessage, dismissError } = this.props;

    let errorAlert;
    if (errorMessage !== null) {
      errorAlert = <Alert bsStyle="danger" onDismiss={dismissError}>{errorMessage}</Alert> 
    }

    return (
      <div>
        <Header email={email} signIn={signIn} signOut={signOut} />

        <Grid>
          <Row>
            <Col xs={12}>
              {errorAlert}
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              Options
            </Col>
            <Col sm={9}>
              <TalkList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

// Prop validation
App.propTypes = {
  email: PropTypes.string,
  errorMessage: PropTypes.string,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { errorMessage, user: { email } } = state;
  return {
    errorMessage,
    email
  };
}

export default connect(mapStateToProps, { signIn, signOut, dismissError })(App);