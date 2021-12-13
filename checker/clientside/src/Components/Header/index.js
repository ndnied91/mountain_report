

import React, { useState } from "react";
import Modal from "./Modal";
import './style.css'

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">

        <h4>Moutains</h4>

      <button onClick={() => setShow(true)}>Select Mountains</button>
      <Modal title="Mountain Selector" onClose={() => setShow(false)} show={show}

      />

    </div>
  );
}
