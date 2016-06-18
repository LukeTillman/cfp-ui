import React, { Component, PropTypes } from 'react';
import { Row, Col, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getAbstracts, showDetails } from './redux-actions';

/**
 * A stateless component representing a single list item.
 */
function TalkListItem({ id, title, authors, company, active, onSelect }) {
  return (
    <ListGroupItem onClick={e => onSelect(id)} active={active}>
      <Row>
        <Col sm={8}>
          <h4>{title}</h4>
          <span className="text-muted">{Object.keys(authors).map(email => authors[email]).join(', ')}</span>
        </Col>
        <Col sm={2}>
          {company}
        </Col>
        <Col sm={2}>
          Rating
        </Col>
      </Row>
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
      <ListGroup className="talks-list">
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