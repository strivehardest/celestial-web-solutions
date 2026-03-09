import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: '/my-icon.png',
  iconSize: [32, 32],
});

// Fix broken default marker icons (Leaflet + webpack issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map({ center = [5.8836217, 0.9828871], zoom = 15, markerText = 'Celestial Web Solutions', height = '100%', useCustomIcon = true, showCircle = true }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} {...(useCustomIcon ? { icon: customIcon } : {})}>
        <Popup>{markerText}</Popup>
      </Marker>
      {showCircle && <Circle center={center} radius={500} />}
    </MapContainer>
  );
}
