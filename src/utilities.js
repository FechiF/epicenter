export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => {
    if (!(cur && typeof cur === 'number')) cur = 0;
    return acc + cur / arr.length;
  }, 0);

export const getQuakeCoordinates = ({ geometry: { coordinates } }) => [
  coordinates[1],
  coordinates[0],
];
