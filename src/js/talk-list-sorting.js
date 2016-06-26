import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { SortByValues, SortDirectionValues } from './redux-actions';

function TalkListSorting({ sortBy, sortDirection, onChange, onDirectionChange }) {
  let isAscending = sortDirection === SortDirectionValues.ASC;

  return (
    <Form inline id="talk-list-sorting">
      <FormGroup bsSize="small">
        <ControlLabel>Sort By</ControlLabel>
        <FormControl componentClass="select" placeholder="Sort talk list by..." onChange={e => onChange(e.target.value)}>
          {Object.keys(SortByValues).map(key => {
            let value = SortByValues[key];
            let selected = sortBy === value;
            return <option key={key} value={value}>{value}</option>;
          })}
        </FormControl>
      </FormGroup>
      <ButtonGroup bsSize="small">
        <Button bsStyle={isAscending ? 'primary' : 'default'} disabled={isAscending} title="Sort ASC" onClick={onDirectionChange}>
          <Glyphicon glyph="arrow-up" />
        </Button>
        <Button bsStyle={!isAscending ? 'primary' : 'default'} disabled={!isAscending} title="Sort DESC" onClick={onDirectionChange}>
          <Glyphicon glyph="arrow-down" />
        </Button>
      </ButtonGroup>
    </Form>
  );
}

TalkListSorting.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDirectionChange: PropTypes.func.isRequired
};

export default TalkListSorting;