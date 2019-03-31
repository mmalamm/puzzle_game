import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import {
  isCellClickable,
  createInitialAppState,
  createNewState,
  isGameWon
} from "./helpers";

export default function App() {
  const [state, setState] = useState(createInitialAppState());
  useEffect(() => {
    isGameWon(state.grid) && alert("You win :)");
  });

  const handleClick = clickedCell => e => {
    e.preventDefault();
    const isClickable = isCellClickable(clickedCell, state.emptyCell);
    if (!isClickable) return;
    const newState = createNewState(clickedCell, state);
    setState(newState);
  };
  return (
    <div className={classes.app}>
      {state.grid.map((row, idx) => (
        <div key={idx} className={classes.row}>
          {row.map(({ c, x, y }) => (
            <p
              className={`${classes.cell} ${c ? classes.tile : classes.empty}`}
              key={`[${x},${y}]`}
              onClick={handleClick({ c, x, y })}
            >
              {c}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
