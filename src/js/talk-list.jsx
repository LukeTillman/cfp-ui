import React, { Component, PropTypes } from 'react';
import { Row, Col, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getAbstracts } from './redux-actions';

class TalkList extends Component {
  componentDidMount() {
    // Load abstracts
    this.props.getAbstracts();
  }

  render() {
    let { talks, talksLoading } = this.props;
    let loadingEl;
    if (talksLoading) {
      loadingEl = <h1 className="text-center"><Glyphicon glyph="refresh" className="glyphicon-spin" /></h1>
    }

    return (
      <div>
        {loadingEl}
        <ListGroup className="talks-list">
        {talks.map(t => {
          return (
            <ListGroupItem key={t.id}>
              <Row>
                <Col sm={8}>
                  <h4>{t.title}</h4>
                  <span className="text-muted">{Object.keys(t.authors).map(email => t.authors[email]).join(', ')}</span>
                </Col>
                <Col sm={2}>
                  {t.company}
                </Col>
                <Col sm={2}>
                  Rating
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
        </ListGroup>
      </div>
    );
  }
}

// Prop validation
TalkList.propTypes = {
  talksLoading: PropTypes.bool.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Action creators
  getAbstracts: PropTypes.func.isRequired
};

// Map redux state to props
function mapStateToProps(state) {
  const { talks, talksLoading } = state;
  return { talks, talksLoading };
}

export default connect(mapStateToProps, { getAbstracts })(TalkList);