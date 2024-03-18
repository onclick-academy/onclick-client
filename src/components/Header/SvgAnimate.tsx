import React from "react";
import { svgs } from "./Svgs";

function SvgAnimate({ svgIndex, svgStyle, activeIndex }) {
  const svg = svgs[svgIndex];

  if (!svg) {
    return null;
  }

  return (
    <svg key={`${svgIndex}-${activeIndex}`} {...svg} className={svgStyle}>
      {svg.paths.map((path, idx) => (
        <path key={idx} {...path}>
          {path.animate && <animate {...path.animate}></animate>}
        </path>
      ))}
    </svg>
  );
}

export default SvgAnimate;
