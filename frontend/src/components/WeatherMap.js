import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import UpdateMapCenter from './UpdateMapCenter';

function WeatherMap({ selectedStation, setSelectedStation, stations }) {

  const findStationDetails = (stationId) => {
    return stations.find(station => station.ID === stationId);
  };

  const stationDetails = findStationDetails(selectedStation);

  return (
    <div className="weather-map">
      <MapContainer
        center={[37.77831908188614, -122.38886381835769]}
        zoom={9}
        minZoom={5}
        maxZoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <UpdateMapCenter stationDetails={stationDetails}/>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station) => (
          <CircleMarker
            key={station.ID}
            center={[station.LAT, station.LON]}
            radius={5} // adjust as needed
            fillColor="#f03" // fill color
            color="#f03" // outline color
            weight={2} // outline weight
            opacity={1}
            fillOpacity={0.5} // adjust for desired fill transparency
            eventHandlers={{
              click: () => {
                setSelectedStation(station.ID);
              },
            }}
          >
            <Popup>
              <div className="stationPopup">
                {station.NAME}
                <br></br>
                <b>{station.ID}</b>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;