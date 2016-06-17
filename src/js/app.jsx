import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col sm={3}>
              Options
            </Col>
            <Col sm={9}>
              Content.
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;