import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { salonAddress } from '../../../api/salon.api';
import Session from '../../../service/session';
import styles from "./Serviceable.module.css";
import Notify from '../../../utils/notify';
// Fix for the default marker icon issue with Leaflet and React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Serviceable = () => {
  const [radius, setRadius] = useState(2000); // Initial radius in meters
  const [center, setCenter] = useState([28.6139, 77.2090]); // Default to some coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      });
    }
  }, []);

  const handleRadiusChange = (event) => {
    setRadius(parseFloat(event.target.value) * 1000); // Convert km to meters
  };

  const handleSave = async () => {
    const salonId = Session.get('salonId'); 
    const payload = {
        field: "range",
        value: String(radius),
    };
    try {
      const response = await salonAddress(salonId, payload);
      // console.log('Radius updated successfully:', response);
      Notify.success(response.message);
    } catch (error) {
      Notify(error.message);
    }
  };

  return (
    <div className={styles.mainDiv}>How far will you deliver your at-home service? Select a range
      <MapContainer center={center} zoom={13} className={styles.mapContainer}>
        <ChangeView center={center} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
        <Circle center={center} radius={radius} pathOptions={{ fillColor: 'blue', color: 'blue' }} />
      </MapContainer>
      <div className={styles.radiusContainer}>
        <input 
          type="range" 
          min="1" 
          max="20" 
          step="0.1"
          value={radius / 1000} 
          onChange={handleRadiusChange} 
        />
        <span>{(radius / 1000).toFixed(1)} KM</span>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Serviceable;
