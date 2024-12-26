import React from "react";
import { Input } from "./styles";

const FilterInput = ({ filters, setFilters }) => (
  <div style={{ padding: "10px", textAlign: "center" }}>
    <label>
      Filter by Assignee:
      <Input
        type="text"
        placeholder="Enter Assignee Name"
        value={filters.assignee}
        onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
      />
    </label>
  </div>
);

export default FilterInput;
