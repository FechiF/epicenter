import { useState, useEffect } from 'react';
import { defaultValues } from '../config';

export function CountryList({ onChange }) {
  const [countries, setCountries] = useState([]);
  const [countryKey, setCountryKey] = useState(defaultValues.country.key);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCountries() {
      setIsLoading(true);
      const res = await fetch(
        `https://raw.githubusercontent.com/grafana/worldmap-panel/91861ffa7fabcb5ffc38b89f27a7942195ff33fe/src/data/countries.json`
      );
      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    }
    setIsLoading(true);
    getCountries();
  }, []);

  return (
    <div className="form__row">
      <label className="form__label" htmlFor="select-country">
        Country
      </label>
      <br />
      <select
        className="form__input form__input--type select-country"
        name="select-country"
        onChange={(e) => {
          setCountryKey(e.target.value);
          onChange(countries.find((country) => country.key === e.target.value));
        }}
        value={countryKey}
      >
        {countries?.map((country) => (
          <Country country={country} key={country.key} value={country} />
        ))}
      </select>
    </div>
  );
}

export function Country({ country }) {
  return <option value={country.key}>{country.name}</option>;
}
