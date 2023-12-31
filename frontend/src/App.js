import React from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import DateTimeOverlay from "./components/DateTimeOverlay";
import WeatherMap from "./components/WeatherMap";
import Header from "./components/Header";
import stations from "./data/nexrad_station_id.json";
import { useState } from "react";

function App() {
  function handleDateTimeSubmit(date, time, stationId) {
    console.log("Selected Date:", date);
    console.log("Selected Time:", time);
    console.log("Selected station:", stationId);
    setSelectedStation(stationId);
  }

  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="container">
      <Header></Header>
      <div className="leaflet-container">
        <DateTimeOverlay
          onSubmit={handleDateTimeSubmit}
        />
        <WeatherMap
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          stations={stations}
        />
      </div>
    </div>
  );
}

export default App;
