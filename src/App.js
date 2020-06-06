import React, { useState } from "react";
import ZoomLineChart from "./ZoomLineChart";
import "./index.css";

const App = () => {

  const [data, setData] = useState(
    Array.from({length: 50}, () => Math.round(Math.random() *100))
  )

  return (
    <div className="container">

      <h2>Zoom Line Chart with D3 </h2>
      
      <ZoomLineChart data={data} />

      <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>Add Data</button> 
    </div>
  );
}

export default App;