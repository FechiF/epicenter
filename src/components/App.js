import { useEffect, useState } from 'react';

import { Main, Logo } from './Layout.js';
import { QuakeList } from './QuakeList.js';
import { CountryList } from './CountryList.js';
import { MagnitudeList } from './MagnitudeList.js';
import { PeriodList } from './PeriodList.js';
import { SortBy } from './SortBy.js';
import { defaultValues } from '../config.js';
import { getQuakeCoordinates } from '../utilities.js';

import Map from './Map.js';
import 'leaflet/dist/leaflet.css';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

export default function App() {
  const [magnitude, setMagnitude] = useLocalStorageState(
    defaultValues.magnitude,
    'magnitude'
  );
  const [period, setPeriod] = useLocalStorageState(
    defaultValues.period,
    'period'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sortProp, setSortProp] = useLocalStorageState('magnitude', 'sortProp');
  const [quakes, setQuakes] = useLocalStorageState([], 'quakes');
  const [mapCenter, setMapCenter] = useLocalStorageState(
    [defaultValues.country.latitude, defaultValues.country.longitude],
    'mapCenter'
  );
  const [page, setPage] = useState(1);

  function handleCountryChange(country) {
    setMapCenter([country.latitude, country.longitude], 'mapCenter');
  }

  function handleClickQuake(quake) {
    setMapCenter(getQuakeCoordinates(quake), 'mapCenter');
  }

  function handleSelectPeriod(period) {
    setPeriod(period, 'period');
    setPage(1);
  }

  function handleSelectMagnitude(magnitude) {
    setMagnitude(magnitude, 'magnitude');
    setPage(1);
  }

  useEffect(
    function () {
      async function getQuakes() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${magnitude}_${period}.geojson`
          );
          if (!res.ok) throw new Error('Problem connecting to USGS feed.');

          const data = await res.json();

          setQuakes(
            data.features.toSorted(
              (a, b) => b.properties.mag - a.properties.mag
            )
          );
          setIsLoading(false);
        } catch (error) {}
      }
      setIsLoading(true);
      getQuakes();
    },
    [magnitude, period]
  );

  return (
    <>
      <Main className="main">
        <div className="sidebar">
          <Logo />

          <form className="form">
            <CountryList onChange={handleCountryChange} />
            <MagnitudeList
              magnitude={magnitude}
              onChange={handleSelectMagnitude}
            />
            <PeriodList period={period} onChange={handleSelectPeriod} />
            <SortBy onChange={setSortProp} />
          </form>

          <div className="summary">
            <p className="quake__unit">
              Total quakes: {quakes.length.toLocaleString()}
            </p>
          </div>

          <QuakeList
            quakes={quakes}
            onSelect={handleClickQuake}
            sortProp={sortProp}
            page={page}
            setPage={setPage}
          />
        </div>

        <div className="map">
          <Map quakes={quakes} mapCenter={mapCenter} />
        </div>
      </Main>
    </>
  );
}
