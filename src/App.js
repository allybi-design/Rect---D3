import React, { useRef, useEffect, useState } from 'react';
import { select, scaleBand, axisBottom, scaleLinear, axisLeft } from "d3";

const App = () => {
  const svgRef = useRef()

  const [data, setData] = useState([3, 25, 30, 45, 60, 30, 45, 60])

  useEffect(() => {
    const svg = select(svgRef.current)

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0])

    const colorScale = scaleLinear()
      .domain([75, 100, 125, 150])
      .range(["green", "yellow", "orange", "red"])
      .clamp(true)

    //x-axis 
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(axisBottom(xScale).ticks(data.length))

    //y-axis 
    svg
      .selectAll(".y-axis")
      // .style("transform", "translateX(300px")
      .call(axisLeft(yScale))

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - -8))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1)
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value))
  }, [data])

  const addNewData = () => {
    setData([...data, Math.round((Math.random() * 100))])
  }

  return (
    <div className="container">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData(data.map(value => value + 5))}>Inc data by 5</button>
      <button onClick={() => addNewData()}>Add New Data</button>
    </div>
  )
}

export default App
