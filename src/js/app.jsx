import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection, rate, changeMobileTab, MobileTabs } from './redux-actions';

import Header from './header';
import TalkList from './talk-list';
import TalkListSorting from './talk-list-sorting';
import TalkListStats from './talk-list-stats';
import TalkDetails from './talk-details';
import TalkActions from './talk-actions';

class App extends Component {
  render() {
    const { 
      email, nextDisabled, previousDisabled, sortBy, sortDirection, data, selectedTalkId, mobileTab,
      signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection, rate, changeMobileTab
    } = this.props;

    let listClass = 'talk-tab-content', detailsClass = 'talk-tab-content';
    switch (mobileTab) {
      case MobileTabs.LIST:
        listClass += ' active';
        break;
      case MobileTabs.DETAILS:
        detailsClass += ' active';
        break;
    }

    let talk = null;
    let comments = null;
    if (selectedTalkId !== null) {
      talk = data.abstractsById[selectedTalkId];
      comments = data.commentsByAbstractId[selectedTalkId];
    }

    return (
      <div id="cfp-app">
        <Header email={email} signIn={signIn} signOut={signOut} />

        <div id="main-content-wrapper">
          <div id="main-content">
            {/* Tabs only visible on mobile */}
            <Nav bsStyle="pills" id="mobile-tabs" activeKey={mobileTab} onSelect={eventKey => changeMobileTab(eventKey)}>
              <NavItem eventKey={MobileTabs.LIST} title="Abstract List">List</NavItem>
              <NavItem eventKey={MobileTabs.DETAILS} title="Abstract Details">Details</NavItem>
            </Nav>

            <div id="talk-content">
              {/* Talk list pane */}
              <div id="talk-list" className={listClass}>
                <TalkListSorting sortBy={sortBy} sortDirection={sortDirection} onChange={changeSortBy} onDirectionChange={toggleSortDirection} />
                <TalkList />
                <TalkListStats abstractsById={data.abstractsById} email={email} />
              </div>

              {/* Talk details pane */}
              <div id="talk-details" className={detailsClass}>
                <TalkActions talk={talk} email={email} onNext={nextTalk} onPrevious={previousTalk} nextDisabled={nextDisabled} 
                             previousDisabled={previousDisabled} onRateClick={rate} />
                <TalkDetails talk={talk} comments={comments} />
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
  nextDisabled: PropTypes.bool.isRequired,
  previousDisabled: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  selectedTalkId: PropTypes.string,
  mobileTab: PropTypes.number.isRequired,

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  nextTalk: PropTypes.func.isRequired,
  previousTalk: PropTypes.func.isRequired,
  changeSortBy: PropTypes.func.isRequired,
  toggleSortDirection: PropTypes.func.isRequired,
  rate: PropTypes.func.isRequired,
  changeMobileTab: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { user: { email }, abstractList: { nextDisabled, previousDisabled, sortBy, sortDirection }, data, selectedTalkId, mobileTab } = state;
  return {
    email,
    nextDisabled,
    previousDisabled,
    sortBy,
    sortDirection,
    data,
    selectedTalkId,
    mobileTab
  };
}

export default connect(mapStateToProps, { signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection, rate, changeMobileTab })(App);