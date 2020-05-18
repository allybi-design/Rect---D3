import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisLeft } from "d3";

const App = () => {
  const svgRef = useRef()

  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75, 40, 20, 45])

  useEffect(() => {
    const svg = select(svgRef.current)

    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300])
    const yScale = scaleLinear().domain([0, 150]).range([150, 0])

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1))

    svg
      .selectAll(".y-axis")
      // .style("transform", "translateX(300px")
      .call(axisLeft(yScale))

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)
  
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "red")
  }, [data])

  return (
    <div className="container">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData(data.map(value => value + 5))}>inc data by 5</button>
    </div>
  )
}

export default App
