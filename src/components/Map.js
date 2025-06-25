import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  Circle,
  Tooltip,
} from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { defaultValues, mapElementsLimit } from '../config';
import { getQuakeCoordinates } from '../utilities';

const API_KEY = '';

function MapPlaceholder() {
  return (
    <p>
      Map of the Philippines.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

function Markers({ quakes }) {
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());
  const redOptions = { color: 'red' };

  useMapEvent('moveend', () => {
    setBounds(map.getBounds());
  });

  function getQuakeRadius({ properties: { mag }, geometry: { coordinates } }) {
    const depth = coordinates[2];
    return Math.exp(mag / 1.01 - 0.13) * 1000;
  }

  function getIcon() {
    return new Icon({
      iconUrl: markerIconPng,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  }

  const visibleQuakes = quakes.filter(({ geometry: { coordinates } }) => {
    const latlng = {
      lat: coordinates[1],
      lng: coordinates[0],
    };
    return bounds.contains(latlng);
  });

  return (
    <>
      {visibleQuakes?.map((quake) => (
        <Circle
          center={getQuakeCoordinates(quake)}
          pathOptions={redOptions}
          radius={getQuakeRadius(quake)}
          key={quake.id}
        >
          <Tooltip>{quake.properties.title}</Tooltip>
        </Circle>
      ))}

      {visibleQuakes.length <= mapElementsLimit &&
        visibleQuakes?.map((quake) => (
          <Marker
            position={getQuakeCoordinates(quake)}
            icon={getIcon()}
            key={quake.id}
          >
            <Popup>{quake.properties.title}</Popup>
          </Marker>
        ))}
    </>
  );
}

function ChangeCenter({ center }) {
  const map = useMap();
  useEffect(
    function changeCtr() {
      map.setView(center); // updates map center
    },
    [center, map]
  );
  return null;
}

export default function Map({ quakes, mapCenter }) {
  return (
    <MapContainer
      {...defaultValues.mapOptions}
      center={mapCenter}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Markers quakes={quakes} center={mapCenter} />
      <ChangeCenter center={mapCenter} />
    </MapContainer>
  );
}
