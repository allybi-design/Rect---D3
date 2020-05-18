import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal } from "d3";

const App = () => {
  const svgRef = useRef()
  
  const [data, setData] = useState([25,30,45,60,20, 65, 75, 90])

  useEffect(() => {
    const svg = select(svgRef.current)
    const myLine = line()
      .x((value, index) => index*50)
      .y(value => 150-value)
      .curve(curveCardinal)
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value * 4)
    //   .attr("cy", value => value * 2)
    //   .attr("stroke", "red")
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "red")
  },[data])

  return (
    <div className="container">
      <h1>hello to D3 tut</h1>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map(value => value+5))}>inc data by 5</button>
    </div>
  )
}

export default App
