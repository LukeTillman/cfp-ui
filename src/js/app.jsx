import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';

import { signIn, signOut, nextTalk, previousTalk } from './redux-actions';

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
    const { email, signIn, signOut, selectedIndex, talks, comments } = this.props;

    let selectedTalk = null;
    let selectedComments = null;
    if (selectedIndex >= 0) {
      selectedTalk = talks[selectedIndex];
      selectedComments = comments[selectedTalk.id];
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

            <div id="talk-content" className="container-fluid">
              {/* Talk list pane */}
              <div id="talk-list" className={listClass}>
                <h4>Sorting</h4>
                <TalkList />
              </div>

              {/* Talk details pane */}
              <div id="talk-details" className={detailsClass}>
                <TalkActions onNext={() => this.props.nextTalk()} onPrevious={() => this.props.previousTalk()} />
                <TalkDetails talk={selectedTalk} comments={selectedComments} />
                <TalkComment />
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
  selectedIndex: PropTypes.number.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.object.isRequired,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  nextTalk: PropTypes.func.isRequired,
  previousTalk: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { user: { email }, abstractList: { selectedIndex, talks }, comments } = state;
  return {
    email,
    selectedIndex,
    talks,
    comments
  };
}

export default connect(mapStateToProps, { signIn, signOut, nextTalk, previousTalk })(App);