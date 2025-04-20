import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import SearchInput from "../components/SearchInput";
import { useSearchFilter } from "../hooks/useSearchFilter";

const TablePage = ({ startDate, endDate, timezone, data, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = useSearchFilter(data, searchTerm);

  return (
    <div className="container">
      <h2>Table Page</h2>
      <div className="selected-dates">
        <strong>Date Range:</strong> {startDate?.toLocaleDateString()} -{" "}
        {endDate?.toLocaleDateString()} ({timezone})
      </div>
      <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} />
      <DataTable data={filteredData} />
      <div className="action-buttons">
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default TablePage;
