import "../styles/components.scss";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { React, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState(1);
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} counter={state} setCounter={setState} />
    </DndProvider>
  );
}

export default MyApp;
