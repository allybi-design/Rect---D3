import React, { useRef, useEffect, useState } from 'react';
import { select } from "d3";

const App = () => {
  const svgRef = useRef()
  
  const [data, setData] = useState([45, 40, 35, 30, 25])

  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 4)
      .attr("cy", value => value * 2)
      .attr("stroke", "red")
  },[data])

  return (
    <div className="container">
      <h1>hello to D3 tut</h1>
      <svg ref={svgRef} />
      <button onClick={() => setData(data.map(value => value+5))}>inc data by 5</button>
    </div>
  )
}

export default App
