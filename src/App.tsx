import { Routes, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useState } from "preact/compat";

export function App(): JSX.Element {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button variant="contained" color="secondary">
        hello world
      </Button>
      <p
        onClick={() => {
          setCount((p) => p + 1);
        }}
      >
        count: {count}
      </p>
      <Routes>
        <Route path="/" element={<p>home</p>} />
        <Route path="/about" element={<p>about</p>} />
        <Route path="/contact" element={<p>contact</p>} />
      </Routes>
    </>
  );
}
