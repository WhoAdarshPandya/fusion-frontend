import { Routes, Route } from "react-router-dom";
import "stoned/dist/index.css";
import { Button } from "stoned";
import { useState } from "preact/compat";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button size="small" raised={true} color="primary">
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
        <Route path="/" element={<p>hello</p>} />
        <Route path="/about" element={<p>about</p>} />
        <Route path="/contact" element={<p>contact</p>} />
      </Routes>
    </>
  );
}
