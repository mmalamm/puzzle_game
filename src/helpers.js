function shuffler(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}

const makeArray = () => Array.from({ length: 15 }).map((_, i) => `${i + 1}`);

export function createInitialAppState() {
  const nums = shuffler(makeArray()),
    len4 = { length: 4 };
  const cells = Array.from(len4).map((_, y) =>
    Array.from(len4).map((_, x) => ({
      x,
      y,
      c: nums.shift() || null
    }))
  );
  return {
    cells,
    emptyCell: cells[3][3]
  };
}
const isWithin1 = (n1, n2) => Math.abs(n1 - n2) <= 1;
export const isCellClickable = (cell, emptyCell) => {
  const { x: cx, y: cy } = cell;
  const { x: ex, y: ey } = emptyCell;
  const isNotEmptyCell = cx !== ex || cy !== ey;
  const isNotDiagonal = cx === ex || cy === ey;
  return (
    isNotEmptyCell && isNotDiagonal && isWithin1(cx, ex) && isWithin1(cy, ey)
  );
};

export const createNewState = (clickedCell, emptyCell, currentCells) => {
  const { x: cx, y: cy, c: cc } = clickedCell;
  const { x: ex, y: ey } = emptyCell;
  const newCells = [
    ...currentCells.map(arr => [...arr.map(el => ({ ...el }))])
  ];
  const newEmptyCell = { x: cx, y: cy, c: null };
  newCells[cy][cx] = newEmptyCell;
  newCells[ey][ex] = { x: ex, y: ey, c: cc };
  return {
    cells: newCells,
    emptyCell: newEmptyCell
  };
};

export const isGameWon = cells => {
  let i = 1;
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      const { c } = cells[x][y];
      if ((x !== 3 || y !== 3) && c === null) return false;
      if (c !== `${i}`) {
        if (x === 3 && y === 3 && c === null) return true;
        return false;
      }
      i++;
    }
  }
  return true;
};
