import React from "react";
import { Button, Form, NavDropdown } from "react-bootstrap";

function Filter({typeFilter, setTypeFilter}) {
    
  return (
    <div >
      <Form style={{display: "flex", justifyContent: "flex-end", }}>
        <NavDropdown title={typeFilter} id="filter" style={{textAlign: "center"}}>
          <NavDropdown.Item onClick={() => setTypeFilter('All')}>All</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setTypeFilter('Live')}>Live</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setTypeFilter('Uploaded')}>Uploaded</NavDropdown.Item>
        </NavDropdown>
        <Button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Filter;
