import React, { useState } from 'react';
import BrushChart from "./BrushChart"
import BrushChartChild from "./BrushChartChild"

const App = () => {

  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  )

  return (
    <div className="container">
      <h1>Sub-selection with d3-brush</h1>
      <BrushChart data={data}>
        {selection => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
      <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>Add Data Node</button>
    </div>
  )
}

export default App
