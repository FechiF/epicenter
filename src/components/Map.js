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
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';

const API_KEY = '785f2ef6-32e3-4cd2-8ecb-c3e3b0a29066';
// const mapTileUrl = `https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=${API_KEY}`;
const mapTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

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
          <Tooltip>
            {quake.properties.mag}M &nbsp;
            {quake.properties.place[0].toUpperCase() +
              quake.properties.place.slice(1)}
          </Tooltip>
        </Circle>
      ))}

      {visibleQuakes.length <= mapElementsLimit &&
        visibleQuakes?.map((quake) => (
          <Marker
            position={getQuakeCoordinates(quake)}
            icon={getIcon()}
            key={quake.id}
          >
            <Popup>
              <div className="quake__main">
                <div
                  className="quake__title"
                  style={{
                    color: quake.properties.alert
                      ? `var(--color-${quake.properties.alert})`
                      : '',
                  }}
                >
                  {quake.properties.mag.toFixed(1)}
                </div>
                <span className="quake__unit">
                  {quake.geometry.coordinates[2].toFixed(1)}m
                </span>
              </div>
              <div>
                <p className="quake__unit">
                  <CalendarMonthOutlinedIcon />{' '}
                  {new Date(quake.properties.time).toLocaleString()}
                </p>
                <p className="quake__details">
                  <LocationOnOutlinedIcon />{' '}
                  {quake.properties.place[0].toUpperCase() +
                    quake.properties.place.slice(1)}
                </p>
                <p className="quake__unit sig">
                  <LabelImportantOutlinedIcon /> Significance:{' '}
                  {quake.properties.sig}
                </p>
              </div>
            </Popup>
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
        url={mapTileUrl}
      />

      <Markers quakes={quakes} center={mapCenter} />
      <ChangeCenter center={mapCenter} />
    </MapContainer>
  );
}
