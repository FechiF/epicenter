import { sortBy } from '../config.js';

export function SortBy({ onChange }) {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor="select-sort">
        Sort by
      </label>
      <select
        className="form__input form__input--type select-sort"
        onChange={(e) => onChange(e.target.value, 'sortProp')}
        name="select-sort"
      >
        {sortBy?.map((option) => (
          <SortOption option={option} key={option} />
        ))}
      </select>
    </div>
  );
}

export function SortOption({ option }) {
  return <option value={option}>{option}</option>;
}
