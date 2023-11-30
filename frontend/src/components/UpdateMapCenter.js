import { useEffect } from 'react';
import { useMap } from "react-leaflet";


function UpdateMapCenter({ stationDetails}) {
    const map = useMap();
    useEffect(() => {
      if (stationDetails && stationDetails.LAT && stationDetails.LON) {
        map.flyTo([stationDetails.LAT, stationDetails.LON], map.getZoom());
      }
    }, [stationDetails, map]); // only selectedStation is a dependency
  
    return null;
  }
  
export default UpdateMapCenter;