import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, subDays } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CalendarSelector = ({
  startDate,
  endDate,
  onChange,
  timezone,
  tooltipMessages,
  maxRange = 10,
}) => {
  const [selectedRange, setSelectedRange] = useState([startDate, endDate]);
  const [showTooltip, setShowTooltip] = useState(false);

  const ninetyDaysAgo = subDays(new Date(), 90);

  useEffect(() => {
    setSelectedRange([startDate, endDate]);
  }, [startDate, endDate]);

  const handleChange = (dates) => {
    const [start, end] = dates;

    if (start && !end) {
      setSelectedRange([start, null]);
      setShowTooltip(false);
      return;
    }

    if (start && end) {
      const rangeLength = differenceInDays(end, start);
      if (rangeLength > maxRange) {
        setShowTooltip(true);
        setSelectedRange([start, null]);
        return;
      } else {
        setShowTooltip(false);
        setSelectedRange([start, end]);
        onChange([start, end]);
      }
    }
  };

  const isDateDisabled = (date) => {
    const msg = tooltipMessages?.[date.toISOString().split("T")[0]];
    return msg?.disabled ?? false;
  };

  const renderDayContents = (day, date) => {
    const dateStr = date.toISOString().split("T")[0];
    const msg = tooltipMessages?.[dateStr];
    return msg ? (
      <div data-tooltip-id="hover-tooltip" data-tooltip-content={msg.text}>
        {day}
      </div>
    ) : (
      day
    );
  };

  return (
    <div>
      {showTooltip && (
        <div
          id="range-limit"
          data-tooltip-id="range-limit"
          data-tooltip-content={`You can't select more than ${maxRange} days.`}
          style={{ position: "absolute", top: 0, left: 0, height: 1, width: 1 }}
        />
      )}

      <DatePicker
        selected={selectedRange[0]}
        onChange={handleChange}
        startDate={selectedRange[0]}
        endDate={selectedRange[1]}
        selectsRange
        minDate={ninetyDaysAgo}
        maxDate={new Date()}
        dayClassName={(date) => (isDateDisabled(date) ? "disabled-date" : "")}
        renderDayContents={renderDayContents}
        inline
      />

      <ReactTooltip id="hover-tooltip" place="top" />
      <ReactTooltip id="range-limit" place="top" />
    </div>
  );
};

export default CalendarSelector;
