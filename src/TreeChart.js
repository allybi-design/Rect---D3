import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "./useResizeObserver";

const TreeChart = ({ data }) => {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const root = hierarchy(data);
    console.log(root)
    const treeLayout = tree().size([dimensions.height, dimensions.width])
    treeLayout(root)

    const linkGenerator = linkHorizontal()
      .x(node => node.y) // flipin x& y to turn  90degreesa
      .y(node => node.x) // flipin x& y to turn  90degreesa

    // Nodes elements
    svg
      .selectAll(".node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("fill", "black")
      .attr("cx", node => node.y) // flipin x & y to turn  90degreesa
      .attr("cy", node => node.x) // flipin x & y to turn  90degreesa
      .attr("opacacity", 0)
      .transition()
      .duration(500)
      .delay("opacity", 1)
    // links
    svg
      .selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", linkGenerator)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke.dashoffset", function () {
        const length = this.getTotalLength()
        return length
      })
      .transition()
      .duration(500)
      .delay(linkObj => linkObj.source.depth * 500)
      .attr("stroke.dashoffset", 0)

    // label icon 
    svg
      .selectAll(".label")
      .data(root.descendants())
      .join("text")
      .attr("class", "label")
      .text(node => node.data.name)
      .attr("text-anchor", "middle")
      .attr("font-size", 24)
      .attr("x", node => node.y) // flipin x & y to turn  90degreesa
      .attr("y", node => node.x - 36) // flipin x & y to turn  90degreesa

    // label title
    svg
      .selectAll(".title")
      .data(root.descendants())
      .join("text")
      .attr("class", "title")
      .text(node => node.data.title)
      .attr("text-anchor", "middle")
      .attr("font-size", 24)
      .attr("x", node => node.y) // flipin x & y to turn  90degreesa
      .attr("y", node => node.x - 10) // flipin x & y to turn  90degreesa

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default TreeChart;