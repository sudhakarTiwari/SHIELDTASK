import React from "react";
import CalendarSelector from "../components/CalendarSelector";
import TimezoneDropdown from "../components/TimezoneDropdown";

const CalendarPage = ({
  startDate,
  endDate,
  onDateChange,
  timezone,
  setTimezone,
  onGo,
}) => {
  const tooltipMessages = {
    "2025-04-15": { text: "Event: System Maintenance", disabled: false },
    "2025-04-16": { text: "Holiday: No data", disabled: true },
  };

  return (
    <div className="container">
      <h2>SHIELD CALENDER</h2>

      <div className="selected-dates">
        <strong>Selected Range:</strong> {startDate?.toLocaleDateString()} to{" "}
        {endDate?.toLocaleDateString()}
      </div>

      <TimezoneDropdown selected={timezone} onChange={setTimezone} />

      <CalendarSelector
        startDate={startDate}
        endDate={endDate}
        onChange={onDateChange}
        timezone={timezone}
        tooltipMessages={tooltipMessages}
      />

      <div className="action-buttons">
        <button onClick={onGo}>Go</button>
      </div>
    </div>
  );
};

export default CalendarPage;
