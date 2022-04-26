import React from "react";
import { NavDropdown } from "react-bootstrap";

function Filter({ typeFilter, setTypeFilter }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <NavDropdown
        title={typeFilter}
        id="filter"
        variant="primary"
        style={{
          textAlign: "center",
          padding: "5px",
          border: "solid 1px #1a1a1a",
        }}
      >
        <NavDropdown.Item onClick={() => setTypeFilter("All")}>
          All
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTypeFilter("Live")}>
          Live
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTypeFilter("Uploaded")}>
          Uploaded
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default Filter;
