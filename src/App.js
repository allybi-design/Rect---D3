import React, { useRef, useEffect, useState } from 'react';
import { select, scaleBand, axisBottom, scaleLinear, axisLeft } from "d3";

const App = () => {
  const svgRef = useRef()

  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75, 40, 20, 45])

  useEffect(() => {
    const svg = select(svgRef.current)

    const xScale = scaleBand()
      .domain(data
        .map((value, index) => index))
      .range([0, 300])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0])

    const colorScale = scaleLinear()
      .domain([75, 100, 125, 150])
      .range(["green", "yellow", "orange", "red"])
      .clamp(true)

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(axisBottom(xScale).ticks(data.length))

    svg
      .selectAll(".y-axis")
      // .style("transform", "translateX(300px")
      .call(axisLeft(yScale))

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "rect")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value))
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
