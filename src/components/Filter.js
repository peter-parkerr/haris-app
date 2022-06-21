import * as React from 'react';
import {FormControl, Button, Col, Row, InputGroup} from 'react-bootstrap';

const Filter = ({onSearchFilter, sortBy}) => {
  return (
    <>
        <Row>
            <Col md={6}></Col>
            <Col md={4}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search the record..."
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        onChange={(event)=>onSearchFilter(event.target.value)}
                    />
                </InputGroup>
                <div className="mb-5">
                    <span>SORT BY: </span>
                    <Button variant="success" onClick={() => sortBy('upVotes')}>
                        Most Upvoted
                    </Button>{' '}
                    <Button variant="success" onClick={() => sortBy('recent')}>
                        Most Recent
                    </Button>
                </div>
        </Col>
        </Row>
    </>
  )
}

export default Filter;
