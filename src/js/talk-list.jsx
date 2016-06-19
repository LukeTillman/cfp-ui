import React, { Component, PropTypes } from 'react';
import { Row, Col, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import GeminiScrollbar from 'react-gemini-scrollbar';

import { getAbstracts, changeSelection } from './redux-actions';

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

  handleSelect(id) {
    this.props.showDetails(id);
  }

  render() {
    let { talks, loading, selectedIndex } = this.props;
    if (loading) {
      return (
        <h1 className="text-center"><Glyphicon glyph="refresh" className="glyphicon-spin" /></h1>
      );
    }
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
  loading: PropTypes.bool.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIndex: PropTypes.number.isRequired,

  // Action creators
  getAbstracts: PropTypes.func.isRequired,
  changeSelection: PropTypes.func.isRequired
};

// Map redux state to props
function mapStateToProps(state) {
  const { abstractList: { talks, loading, selectedIndex } } = state;
  return { talks, loading, selectedIndex };
}

export default connect(mapStateToProps, { getAbstracts, changeSelection })(TalkList);