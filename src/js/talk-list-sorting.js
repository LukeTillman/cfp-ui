import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function TalkListSorting() {
  return (
    <Form inline id="talk-list-sorting">
      <FormGroup bsSize="small">
        <ControlLabel>Sort</ControlLabel>
        <FormControl componentClass="select" placeholder="Sort talk list by...">
          <option value="Default">Default</option>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Title">Company</option>
          <option value="Rating">Rating</option>
        </FormControl>
      </FormGroup>
    </Form>
  );
}

export default TalkListSorting;