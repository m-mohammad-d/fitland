"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map, Icon, LatLngExpression } from "leaflet";
type Props = {
  onChange: (lat: number, lng: number) => void;
  mapRef?: React.RefObject<Map | null>;
  location?: LatLngExpression;
};
const customIcon = new Icon({
  iconUrl: "/icons/location-sign.png",
  iconSize: [24, 24],
});

export default function MapViewer({ onChange, mapRef, location }: Props) {
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onChange(lat, lng);
      },
    });

    return null;
  };

  return (
    <MapContainer center={location ? location : [35.6892, 51.389]} zoom={30} ref={mapRef} style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon} />
      <MapClickHandler />
    </MapContainer>
  );
}
