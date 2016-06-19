import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Alert, Nav, NavItem } from 'react-bootstrap';

import { signIn, signOut, dismissError } from './redux-actions';

import Header from './header';
import TalkList from './talk-list';
import TalkDetails from './talk-details';
import TalkActions from './talk-actions';
import TalkComment from './talk-comment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
    };
  }

  tabSelected(eventKey) {
    this.setState({ activeTab: eventKey });
  }

  render() {
    const { email, signIn, signOut, errorMessage, dismissError, selectedId, talks, comments } = this.props;

    let errorAlert;
    if (errorMessage !== null) {
      errorAlert = <Alert bsStyle="danger" id="main-error-alert" onDismiss={dismissError}>{errorMessage}</Alert> 
    }

    let selectedTalk = null;
    let selectedComments = null;
    if (selectedId !== null) {
      selectedTalk = talks.find(t => t.id === selectedId);
      selectedComments = comments[selectedId];
    }

    let listClass = 'talk-tab-content', detailsClass = 'talk-tab-content';
    switch (this.state.activeTab) {
      case 1:
        listClass += ' active';
        break;
      case 2:
        detailsClass += ' active';
        break;
    }

    return (
      <div id="cfp-app">
        <Header email={email} signIn={signIn} signOut={signOut} />

        <div id="main-content-wrapper">
          <div id="main-content">
            {/* Tabs only visible on mobile */}
            <Nav bsStyle="pills" id="mobile-tabs" activeKey={this.state.activeTab} onSelect={eventKey => this.tabSelected(eventKey)}>
              <NavItem eventKey={1} title="Abstract List">List</NavItem>
              <NavItem eventKey={2} title="Abstract Details">Details</NavItem>
            </Nav>

            <div id="talk-content" className="container">
              {errorAlert}

              <div id="talk-tab-contents">
                {/* Talk list pane */}
                <div id="talk-list" className={listClass}>
                  <h4>Sorting</h4>
                  <TalkList />
                </div>

                {/* Talk details pane */}
                <div id="talk-details" className={detailsClass}>
                  <TalkActions />
                  <TalkDetails talk={selectedTalk} comments={selectedComments} />
                  <TalkComment />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Prop validation
App.propTypes = {
  email: PropTypes.string,
  errorMessage: PropTypes.string,
  selectedId: PropTypes.string,
  talks: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.object,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { errorMessage, user: { email }, abstractList: { selectedId, talks }, comments } = state;
  return {
    errorMessage,
    email,
    selectedId,
    talks,
    comments
  };
}

export default connect(mapStateToProps, { signIn, signOut, dismissError })(App);