import React, { useState, useRef, useEffect } from "react";
import {
  select, scaleLinear, max, line, curveCardinal, axisBottom, axisLeft, event, brushX
} from "d3";
import useResizeObserver from "./useResizeObserver";
import usePrevious from "./usePrevious";

const BrushChart = ({ data, selection, clipPathId = "clipPath1" }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    
    const svg = select(svgRef.current);
    const content = svg.select(".content")
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()

    // scales + line generator
    const xScale = scaleLinear()
      .domain(selection)
      .range([0, width])

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height-10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    content
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator)

    content
      .selectAll(".Node")
      .data(data)
      .join("circle")
      .attr("class", "Node")
      .attr("stroke", "black")
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "orange" : "black"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis);

  }, [data, dimensions, selection]);


  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ margin: "2rem" }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={clipPathId}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${clipPathId})`} />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    
    </React.Fragment>
  );
}

export default BrushChart
