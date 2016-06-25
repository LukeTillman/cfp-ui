import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection } from './redux-actions';

import Header from './header';
import TalkList from './talk-list';
import TalkListSorting from './talk-list-sorting';
import TalkDetails from './talk-details';
import TalkActions from './talk-actions';

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
    const { 
      email, nextDisabled, previousDisabled, sortBy, sortDirection,
      signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection 
    } = this.props;

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

            <div id="talk-content">
              {/* Talk list pane */}
              <div id="talk-list" className={listClass}>
                <TalkListSorting sortBy={sortBy} sortDirection={sortDirection} onChange={changeSortBy} onDirectionChange={toggleSortDirection} />
                <TalkList />
              </div>

              {/* Talk details pane */}
              <div id="talk-details" className={detailsClass}>
                <TalkActions onNext={nextTalk} onPrevious={previousTalk} nextDisabled={nextDisabled} previousDisabled={previousDisabled} />
                <TalkDetails />
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

  // Action creators
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  nextTalk: PropTypes.func.isRequired,
  previousTalk: PropTypes.func.isRequired,
  changeSortBy: PropTypes.func.isRequired,
  toggleSortDirection: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { user: { email }, abstractList: { nextDisabled, previousDisabled, sortBy, sortDirection } } = state;
  return {
    email,
    nextDisabled,
    previousDisabled,
    sortBy,
    sortDirection
  };
}

export default connect(mapStateToProps, { signIn, signOut, nextTalk, previousTalk, changeSortBy, toggleSortDirection })(App);