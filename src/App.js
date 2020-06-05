import React, { useState } from 'react';
import BrushChart from "./BrushChart"


const App = () => {

  const [data, setData] = useState([10,25,30,40,25,60])

  return (
    <div className="container">
      <h1>Sub-selection with d3-brush</h1>
      <BrushChart data={data}/>
      <button onClick={() => setData([...data, Math.round(Math.random()*100)])}>Add Data Node</button>
    </div>
  )
}

export default App
