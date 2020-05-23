import React, { useRef, useEffect } from "react";
import { select, scaleLinear, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";

const RacingBarChart = ({ data }) => {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    data.sort((a, b) => b.value - a.value)

    // scales
    const yScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height])
      .padding(0.125);

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.value)])
      .range([0, dimensions.width])


    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
        )
      .attr("fill", entry => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index))

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("text").attr("y", (entry, index) => yScale(index))
      )
      .text(entry => ` - ${entry.name} (${entry.value} meters)`)
      .attr("class", "label")
      .attr("x", 10)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth()-5)

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}>
        {/* <g className="x-axis" />
        <g className="y-axis" /> */}
      </svg>
    </div>
  );
}

export default RacingBarChart;