import React from "react";
import stations from "../data/nexrad_station_id.json";

function DateTimeOverlay({ onSubmit}) {
  function handleSubmit(e) {
    e.preventDefault();
    const date = new Date(e.target.date.value);
    const time = e.target.time.value;
    const station = e.target.station.value;
    onSubmit(date, time, station);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format to yyyy-mm-dd
  const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // Format to HH:MM

  return (
    <div className="timeoverlay">
      <div className="timeoverlayhead">
        <h1>Let's Rewind!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <select name="station" required>
            {stations.map((station) => (
              <option key={station.ID} value={station.ID}>
                {station.ID}
              </option>
            ))}
          </select>
        </label>
        <input type="date" name="date" required defaultValue={formattedDate}/>
        <input type="time" name="time" required defaultValue={formattedTime}/>
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default DateTimeOverlay;
