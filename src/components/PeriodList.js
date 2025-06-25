import { periods } from '../config.js';

export function PeriodList({ period, onChange }) {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor="select-period">
        Period
      </label>
      <select
        className="form__input form__input--type select-period"
        onChange={(e) => onChange(e.target.value)}
        value={period}
        name="select-period"
      >
        {periods?.map((p) => (
          <Period period={p} key={p} />
        ))}
      </select>
    </div>
  );
}

export function Period({ period }) {
  return <option value={period}>{period}</option>;
}
