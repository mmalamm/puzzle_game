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

const isWithin1 = (n1, n2) => Math.abs(n1 - n2) <= 1;
export function isCellClickable(cell, emptyCell) {
  const { x: cx, y: cy } = cell;
  const { x: ex, y: ey } = emptyCell;
  const isNotEmptyCell = cx !== ex || cy !== ey;
  const isNotDiagonal = cx === ex || cy === ey;
  return (
    isNotEmptyCell && isNotDiagonal && isWithin1(cx, ex) && isWithin1(cy, ey)
  );
}

export function createNewState(clickedCell, { emptyCell, grid }) {
  const { x: cx, y: cy, c: cc } = clickedCell;
  const { x: ex, y: ey } = emptyCell;
  const newGrid = [...grid.map(row => [...row.map(cell => ({ ...cell }))])];
  const newEmptyCell = { x: cx, y: cy, c: null };
  newGrid[cy][cx] = newEmptyCell;
  newGrid[ey][ex] = { x: ex, y: ey, c: cc };
  return {
    grid: newGrid,
    emptyCell: newEmptyCell
  };
}

export function isGameWon(grid) {
  let i = 1;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const { c } = grid[x][y];
      if ((x !== 3 || y !== 3) && c === null) return false;
      if (c !== i) {
        if (x === 3 && y === 3 && c === null) return true;
        return false;
      }
      i++;
    }
  }
}
