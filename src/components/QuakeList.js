import { useState } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import Pagination from '@mui/material/Pagination';

export function QuakeList({ quakes, onSelect, sortProp, setPage, page }) {
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sortedQuakes = getSortedQuakes();
  const currentItems = sortedQuakes.slice(startIndex, endIndex);

  function handleChange(event, value) {
    setPage(value);
  }

  function getSortedQuakes() {
    switch (sortProp) {
      case 'newest first':
        return quakes.toSorted((a, b) => b.properties.time - a.properties.time);

      case 'greatest significance':
        return quakes.toSorted((a, b) => b.properties.sig - a.properties.sig);

      case 'shallowest depth':
        return quakes.toSorted(
          (a, b) => a.geometry.coordinates[2] - b.geometry.coordinates[2]
        );

      default:
        return quakes.toSorted((a, b) => b.properties.mag - a.properties.mag);
    }
  }

  return (
    <>
      <ul className="list quakes">
        {currentItems?.map((quake) => (
          <Quake quake={quake} key={quake.id} onSelect={onSelect} />
        ))}
      </ul>
      <Pagination
        count={Math.ceil(quakes.length / itemsPerPage)} // Total number of pages
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </>
  );
}

export function Quake({ quake, onSelect }) {
  return (
    <li
      className="quake"
      style={{
        borderLeft: `5px solid var(--color-${
          quake.properties.alert ? quake.properties.alert : 'light--1'
        })`,
      }}
      onClick={() => {
        onSelect(quake);
      }}
    >
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
          <LabelImportantOutlinedIcon /> Significance: {quake.properties.sig}
        </p>
      </div>
    </li>
  );
}
