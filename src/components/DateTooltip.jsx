import React from "react";

const DateTooltip = ({ message, day }) => {
  return (
    <div className="tooltip-container">
      <span className="tooltip-text">{message}</span>
      {day}
    </div>
  );
};

export default DateTooltip;
