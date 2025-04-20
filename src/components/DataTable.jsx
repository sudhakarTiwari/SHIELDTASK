import React, { useState } from "react";

const DataTable = ({ data }) => {
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === bVal) return 0;
    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  return (
    <table className="data-table">
      <thead>
        <tr>
          {["name", "date", "amount", "status"].map((key) => (
            <th key={key} onClick={() => handleSort(key)}>
              {key.toUpperCase()}{" "}
              {sortKey === key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan="4">No data found.</td>
          </tr>
        ) : (
          sortedData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
