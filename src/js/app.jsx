import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

import { signIn, signOut, dismissError } from './redux-actions';

import Header from './header';
import TalkList from './talk-list';
import TalkDetails from './talk-details';

class App extends Component {
  render() {
    const { email, signIn, signOut, errorMessage, dismissError, selectedId, talks } = this.props;

    let errorAlert;
    if (errorMessage !== null) {
      errorAlert = <Alert bsStyle="danger" onDismiss={dismissError}>{errorMessage}</Alert> 
    }

    let selectedTalk = null;
    if (selectedId !== null) {
      selectedTalk = talks.find(t => t.id === selectedId);
    }

    return (
      <div>
        <Header email={email} signIn={signIn} signOut={signOut} />

        <Grid id="main-content">
          <Row>
            <Col xs={12}>
              {errorAlert}
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <TalkList />
            </Col>
            <Col sm={8}>
              <TalkDetails talk={selectedTalk} />
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
  selectedId: PropTypes.string,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { errorMessage, user: { email }, abstractList: { selectedId, talks } } = state;
  return {
    errorMessage,
    email,
    selectedId,
    talks
  };
}

export default connect(mapStateToProps, { signIn, signOut, dismissError })(App);