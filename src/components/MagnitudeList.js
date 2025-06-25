import { magnitudes } from '../config.js';

export function MagnitudeList({ onChange, magnitude }) {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor="select-magnitude">
        Magnitude
      </label>
      <select
        className="form__input form__input--type select-magnitude"
        value={magnitude}
        onChange={(e) => onChange(e.target.value)}
        name="select-magnitude"
      >
        {magnitudes?.map((m) => (
          <Magnitude magnitude={m} key={m} />
        ))}
      </select>
    </div>
  );
}

export function Magnitude({ magnitude }) {
  return (
    <option value={magnitude}>
      {magnitude} {magnitude.includes('.') ? ' and above' : ''}
    </option>
  );
}
