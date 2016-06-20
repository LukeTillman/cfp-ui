import React, { Component, PropTypes } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import GeminiScrollbar from 'react-gemini-scrollbar';

import { getAbstracts, changeSelection, changeNextDisabled, changePreviousDisabled } from './redux-actions';

/**
 * A stateless component representing a single list item.
 */
function TalkListItem({ id, title, authors, company, active, onClick }) {
  let authorsList = Object.keys(authors).map(email => authors[email]).join(', ');
  return (
    <ListGroupItem onClick={onClick} active={active}>
      <h5>{title}</h5>
      <small>{authorsList}</small><br/>
      <small className="text-muted">{company}</small>
    </ListGroupItem>
  );
}

// Prop validation
TalkListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.object.isRequired,
  company: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

/**
 * The list of talks.
 */
class TalkList extends Component {
  componentDidMount() {
    // Load abstracts
    this.props.getAbstracts();
  }

  componentDidUpdate(prevProps) {
    // Check if we need to enable or disable the previous and next buttons
    if (this.props.selectedIndex <= 0 && this.props.previousDisabled === false) {
      this.props.changePreviousDisabled(true);
    }

    if (this.props.selectedIndex > 0 && this.props.previousDisabled === true) {
      this.props.changePreviousDisabled(false);
    }

    if (this.props.selectedIndex === this.props.talks.length - 1 && this.props.nextDisabled === false) {
      this.props.changeNextDisabled(true);
    }

    if (this.props.selectedIndex !== this.props.talks.length - 1 && this.props.nextDisabled === true) {
      this.props.changeNextDisabled(false);
    }
  }

  render() {
    let { talks, selectedIndex } = this.props;
    return (
      <ListGroup>
        <GeminiScrollbar>
          {talks.map((t, idx) => {
            let active = selectedIndex === idx;
            return <TalkListItem {...t} key={t.id} active={active} onClick={() => this.props.changeSelection(idx)} />
          })}
        </GeminiScrollbar>
      </ListGroup>
    );
  }
}

// Prop validation
TalkList.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  previousDisabled: PropTypes.bool.isRequired,

  // Action creators
  getAbstracts: PropTypes.func.isRequired,
  changeSelection: PropTypes.func.isRequired,
  changeNextDisabled: PropTypes.func.isRequired,
  changePreviousDisabled: PropTypes.func.isRequired
};

const sortBySelector = state => state.abstractList.sortBy;
const talkDataSelector = state => state.data.abstractsById;
const talksSelector = createSelector(
  sortBySelector,
  talkDataSelector,
  (sortBy, talksById) => {
    // TODO: Sorting
    return Object.keys(talksById).map(id => talksById[id]);
  }
);

const abstractListSelector = state => state.abstractList;

const mapStateToProps = createSelector(
  abstractListSelector,
  talksSelector,
  (abstractList, talks) => {
    return { ...abstractList, talks };
  }
);


export default connect(mapStateToProps, { getAbstracts, changeSelection, changeNextDisabled, changePreviousDisabled })(TalkList);