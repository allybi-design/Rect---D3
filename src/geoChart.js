import React, { useState, useRef, useEffect } from "react";
import {
  select,
  geoPath,
  geoMercator,
  min,
  max,
  scaleLinear
} from "d3";
import useResizeObserver from "./useResizeObserver";

const GeoChart = ({ data, property }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null)
  // console.log(wrapperRef)
  // will be called initially and on every data change
  useEffect(() => {
    
    const svg = select(svgRef.current);
    const minProp = Math.max(0, min(data.features, feature => feature.properties[property]))
    const maxProp = max(data.features, feature => feature.properties[property])

    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#aaa", "#f00"])

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100)
    
    const pathGenerator = geoPath().projection(projection)

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", feature => {
        console.log(feature)
        setSelectedCountry(selectedCountry === feature ? null : feature)
      })
      .attr("class", "country")
      .transition()
      .duration(1000)
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature))

      svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.name +
          ": " +
          feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature => feature && `${feature.properties.name}: ${feature.properties[property].toLocaleString()}`)
      .attr("x", 10)
      .attr("y", 25);

    }, [data, dimensions, property, selectedCountry]);
    
 
  return (
    <div ref={wrapperRef} style={{ margin: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart
