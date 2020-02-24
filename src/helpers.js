const makeArray = () => Array.from({ length: 15 }).map((_, i) => i + 1);
const countInversions = arr =>
  arr.reduce(
    (inv, el, idx, a) =>
      inv + a.slice(idx + 1).filter(nestedEl => nestedEl < el).length,
    0
  );

function shuffler(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}

export const getBgPos = (num, cellSize = 100) => {
  if (num === null) return "300px 300px";
  const idx = num - 1;
  const f = cellSize;
  const x = -(idx % 4) * f;
  const y = -((idx / 4) | 0) * f;
  return `${x}px ${y}px`;
};

function createSolvableArray() {
  const nums = shuffler(makeArray());
  return countInversions(nums) % 2 === 0
    ? [[...nums, null], { x: 0, y: 0, c: null }]
    : [[null, ...nums], { x: 3, y: 3, c: null }];
}

export function createInitialAppState() {
  const [nums, emptyCell] = createSolvableArray(),
    len4 = { length: 4 };
  const grid = Array.from(len4).map((_, y) =>
    Array.from(len4).map((_, x) => ({
      c: nums.pop(),
      x,
      y
    }))
  );
  return {
    grid,
    emptyCell
  };
}

export const isCellClickable = ({ x: cx, y: cy }, { x: ex, y: ey }) =>
  (cx !== ex || cy !== ey) && (cx === ex || cy === ey);

export function createNewState(clickedCell, { emptyCell, grid }) {
  const { x: cx, y: cy } = clickedCell,
    { x: ex, y: ey } = emptyCell,
    newGrid = [...grid.map(row => [...row.map(cell => ({ ...cell }))])],
    newEmptyCell = { ...clickedCell, c: null };

  newGrid[cy][cx] = newEmptyCell;

  const getC = ({ c }) => c,
    getCol = row => row[cx],
    isSameRow = ey === cy,
    isClickedCellOnRight = cx > ex,
    isClickedCellBelow = cy > ey,
    valuesToWrite = (isSameRow
      ? (isClickedCellOnRight
          ? [...newGrid[cy].slice(ex, cx), { ...clickedCell }]
          : [{ ...clickedCell }, ...newGrid[cy].slice(cx, ex)]
        ).filter(getC)
      : isClickedCellBelow
      ? [
          ...grid
            .slice(ey, cy)
            .map(getCol)
            .filter(getC),
          { ...clickedCell }
        ]
      : [...grid.slice(cy, ey).map(getCol)]
    ).map(getC),
    cellsToReplace = (isSameRow
      ? isClickedCellOnRight
        ? [...newGrid[cy].slice(ex, cx)]
        : [...newGrid[cy].slice(cx, ex).filter(getC), { ...emptyCell }]
      : isClickedCellBelow
      ? [...grid.slice(ey, cy).map(getCol)]
      : [
          ...newGrid
            .slice(cy, ey)
            .map(getCol)
            .filter(getC),
          { ...emptyCell }
        ]
    ).map((cell, i) => ({ ...cell, c: valuesToWrite[i] }));

  cellsToReplace.forEach(cell => {
    newGrid[cell.y][cell.x] = cell;
  });

  return {
    grid: newGrid,
    emptyCell: newEmptyCell
  };
}

export function isGameWon(grid) {
  let i = 1;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const { c } = grid[y][x];
      if ((x !== 3 || y !== 3) && c === null) return false;
      if (c !== i) {
        if (x === 3 && y === 3 && c === null) return true;
        return false;
      }
      i++;
    }
  }
}
