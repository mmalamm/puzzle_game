import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import useWindowSize from "./useWindowSize";
import {
  isCellClickable,
  createInitialAppState,
  createNewState,
  isGameWon,
  getBgPos
} from "./helpers";

export default function App() {
  const [state, setState] = useState(createInitialAppState());
  const size = useWindowSize();
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

  const cellSize = size.width > 800 ? 200 : size.width / 4;

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
                  backgroundSize: cellSize * 4 + "px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: getBgPos(c, cellSize),
                  width: cellSize + "px",
                  height: cellSize + "px"
                }}
              ></p>
            );
          })}
        </div>
      ))}
    </div>
  );
}
