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
    if (isGameWon(state.grid)) {
      alert("You win :)");
      setState(createInitialAppState());
    }
  });

  const handleClick = clickedCell => e => {
    const isClickable = isCellClickable(clickedCell, state.emptyCell);
    if (!isClickable) return;
    const newState = createNewState(clickedCell, state);
    setState(newState);
  };
  const isTouchScreen = !("maxTouchPoints" in Navigator);
  return (
    <div className={classes.app}>
      {state.grid.map((row, idx) => (
        <div key={idx} className={classes.row}>
          {row.map(({ c, x, y }) => {
            const handler = handleClick({ c, x, y }),
              interactionProp = isTouchScreen
                ? { onTouchStart: handler }
                : { onMouseDown: handler };
            return (
              <p
                className={`${classes.cell} ${
                  c ? classes.tile : classes.empty
                }`}
                key={`[${x},${y}]`}
                {...interactionProp}
              >
                {c}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}
