import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import {
  isCellClickable,
  createInitialAppState,
  createNewState,
  isGameWon,
  getBgPos
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

  return (
    <div className={classes.app}>
      {state.grid.map((row, idx) => (
        <div key={idx} className={classes.row}>
          {row.map(({ c, x, y }) => {
            const handler = handleClick({ c, x, y }),
              interactionProp = { onTouchStart: handler, onMouseDown: handler };
            return (
              <p
                className={`${classes.cell} ${
                  c ? classes.tile : classes.empty
                }`}
                key={`[${x},${y}]`}
                {...interactionProp}
                style={{
                  backgroundImage: `url("https://avatars2.githubusercontent.com/u/23639980?s=400&v=4")`,
                  backgroundSize: "400px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: getBgPos(c)
                }}
              ></p>
            );
          })}
        </div>
      ))}
    </div>
  );
}
