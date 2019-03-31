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

  const handleClick = clickedCell => e => {
    const isClickable = isCellClickable(clickedCell, state.emptyCell);
    if (!isClickable) return;
    const newState = createNewState(clickedCell, state.emptyCell, state.cells);
    setState(newState);
  };
  useEffect(() => {
    isGameWon(state.cells) && alert("You win :)");
  });
  return (
    <div className={classes.app}>
      <div className={classes.outer}>
        {state.cells.map((innerArr, idx) => (
          <div key={idx} className={classes.inner}>
            {innerArr.map(({ c, x, y }) => (
              <p
                className={`${classes.cell} ${
                  c ? classes.yellow : classes.white
                }`}
                key={`[${x},${y}]`}
                onClick={handleClick({ c, x, y })}
              >
                {c}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
