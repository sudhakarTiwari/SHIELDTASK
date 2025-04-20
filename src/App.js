import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import TablePage from "./pages/TablePage";
import { useDateRange } from "./hooks/useDateRange";
import { formatDateWithTimezone } from "./utils/formatDateWithTimezone";
import { fetchData } from "./utils/dummyApi";
import "./styles.css";

const MainApp = () => {
  const [range, setRange] = useDateRange();
  const [timezone, setTimezone] = useState("Europe/Moscow");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleGo = async () => {
    const [startDate, endDate] = range;
    const startStr = formatDateWithTimezone(startDate, timezone);
    const endStr = formatDateWithTimezone(endDate, timezone);
    const result = await fetchData(startStr, endStr, timezone);
    setData(result);
    navigate("/table");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CalendarPage
            startDate={range[0]}
            endDate={range[1]}
            onDateChange={setRange}
            timezone={timezone}
            setTimezone={setTimezone}
            onGo={handleGo}
          />
        }
      />
      <Route
        path="/table"
        element={
          <TablePage
            startDate={range[0]}
            endDate={range[1]}
            timezone={timezone}
            data={data}
            onBack={handleBack}
          />
        }
      />
    </Routes>
  );
};

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
