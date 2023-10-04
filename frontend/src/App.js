import React from "react";
import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DateTimeOverlay from './components/DateTimeOverlay';

function App() {

  const handleDateTimeSubmit = (date, time) => {
    console.log("Selected Date:", date);
    console.log("Selected Time:", time);
    // Pass the data to another function or perform your desired action
  };

  return (
    <div className="container">
      <div className="header">RadarRewind</div>
      <div className="leaflet-container">
        <DateTimeOverlay onSubmit={handleDateTimeSubmit} />
        <MapContainer
          center={[37.60900565748196, -122.32823527245013]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
