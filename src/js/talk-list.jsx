import React, { Component, PropTypes } from 'react';
import { Row, Col, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getAbstracts, showDetails } from './redux-actions';

/**
 * A stateless component representing a single list item.
 */
function TalkListItem({ id, title, authors, company, active, onSelect }) {
  let authorsList = Object.keys(authors).map(email => authors[email]).join(', ');
  return (
    <ListGroupItem onClick={e => onSelect(id)} active={active}>
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
  onSelect: PropTypes.func.isRequired
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
    let { talks, loading, selectedId } = this.props;
    if (loading) {
      return (
        <h1 className="text-center"><Glyphicon glyph="refresh" className="glyphicon-spin" /></h1>
      );
    }
    return (
      <ListGroup id="talk-list">
        {talks.map(t => {
          let active = selectedId === t.id;
          return <TalkListItem {...t} key={t.id} active={active} onSelect={id => this.handleSelect(id)} />
        })}
      </ListGroup>
    );
  }
}

// Prop validation
TalkList.propTypes = {
  loading: PropTypes.bool.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.string,

  // Action creators
  getAbstracts: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired
};

// Map redux state to props
function mapStateToProps(state) {
  const { abstractList: { talks, loading, selectedId } } = state;
  return { talks, loading, selectedId };
}

export default connect(mapStateToProps, { getAbstracts, showDetails })(TalkList);