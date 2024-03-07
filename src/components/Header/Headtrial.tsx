import React, { useState, useEffect, CSSProperties } from "react";
import SvgAnimate from "./SvgAnimate";

export default function StylingTransition() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordsWithSvgIndexes, setWordsWithSvgIndexes] = useState([
    {
      sentence: "From the Bottom of confusion      to the top of Succsetion",
      svgs: [0, 1, 3],
      svgStyles: [
        {
          position: "absolute",
          top: "47%",
          left: "75%",
          color: "#bbff8e",
          width: "170px",
        },
        {
          position: "absolute",
          top: "30%",
          left: "12%",
          color: "#ff0000",
          width: "205px",
          // animation: "draw-from-around-0 10s ease-in",
          zIndex: 1,
        },
        {
          position: "absolute",
          top: "90%",
          left: "38%",
          color: "#bbff8e",
          width: "260px",
          // animation: "draw-from-around-0 10s ease-in",
          zIndex: 1,
        },
      ],
    },
    {
      sentence: "From humble beginnings         grea  success can be achieved.",
      svgs: [0, 1, 3,3],
      svgStyles: [
        {
          position: "absolute",
          top: "78%",
          left: "12%",
          transform: "rotate(270deg)",
          color: "#bbff8e",
          width: "70px",
        },
        {
         position: "absolute",
          top: "30%",
          left: "0%",
          color: "#ff0000",
          width: "205px",
          // animation: "draw-from-around-0 10s ease-in",
          zIndex: 1,
        },
        {
          position: "absolute",
          top: "75%",
          left: "12%",
          color: "#9ee46f",
          width: "70px",
          
        }, {
          position: "absolute",
          top: "90%",
          left: "70%",
          color: "#9ee46f",
          width: "250px",
          
        },
      ],
    },
    {
      sentence: "From the depths of doubt, rise      to greatness",
      svgs: [3,0,0,0,3],
      svgStyles: [
        {
          position: "absolute",
          top: "48%",
          left: "45%",
          color: "#ff0000",
          width: "190px",
          zIndex: 999,
          
        },{
          position: "absolute",
          bottom: "20%",
          right: "55%",
          color: "#9ee46f",
          transform: "rotate(270deg)",
          width: "70px",
          
          zIndex: 999,
          
        },{
          position: "absolute",
          bottom: "20%",
        right: "53%",
          color: "#9ee46f",
          transform: "rotate(270deg)",
          width: "80px",
          zIndex: 999,
          
        },{
          position: "absolute",
          bottom: "20%",
          right: "50%",
          color: "#9ee46f",
          transform: "rotate(270deg)",
          width: "100px",
          zIndex: 999,
          
        },{
          position: "absolute",
          bottom: "9%",
          right: "60%",
          color: "#9ee46f",
          width: "250px",
          zIndex: 999,
          
        },
      ],
    },
    {
      sentence: "OnClick your career begins",
      svgs: [2,3],
      svgStyles: [
        {
          position: "absolute",
          top: "10%",
          left: "0%",
          color: "#ff0000",
          width: "280px",
          zIndex: 1,
        }, {
          position: "absolute",
          bottom: "6%",
          left: "5%",
          color: "#9ee46f",
          width: "550px",
          zIndex: 1,
        },
      ],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex < wordsWithSvgIndexes.length - 1 ? prevIndex + 1 : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [wordsWithSvgIndexes.length]);

  // State for controlling the visibility of each word
  const [wordStates, setWordStates] = useState(
    wordsWithSvgIndexes.map((_, index) => index === 0)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextState = wordStates.map((_, index) => index === activeIndex);
      setWordStates(nextState);
    }, 0);
    return () => clearTimeout(timeout);
  }, [activeIndex, wordStates]);

  return (
    <>
      <style>{`
        @keyframes draw-from-above-${activeIndex} {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes draw-from-around-${activeIndex} {
          from {
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={{ backgroundColor: "blue", position: "relative" }}>
        <h1 className="hero__heading">
          <aside style={containerStyle}>
            {wordsWithSvgIndexes.map(({ sentence, svgs, svgStyles }, index) => (
              <div
                key={index}
                style={{
                  ...wordStyle,
                  ...(wordStates[index] && activeStyle && animationStyle),
                  ...(wordStates[index] && index > 0 && animationStyle),
                }}
              >
                <h1
                  style={{
                    animation: `draw-from-above-${index} 1s ease-in-out`,
                    zIndex: 999,
                  }}
                >
                  {sentence.split(" ")[0]}
                </h1>
                <h2
                  style={{
                    animation: `draw-from-above-${index} 1s ease-in-out`,
                    position: "relative",
                    whiteSpace: "pre",
                    zIndex: 999,
                  }}
                >
                  {sentence.split(" ").slice(1, 11).join("\u00A0")}
                </h2>
                <h2
                  style={{
                    animation: `draw-from-above-${index} 1s ease-in-out`,
                    position: "relative",
                    whiteSpace: "pre",
                    zIndex: 999,
                  }}
                >
                  {sentence.split(" ").slice(11).join("\u00A0")}
                </h2>
                <div style={{ zIndex: "1" }}>
                  {svgs.map((svgIndex, idx) => (
                    <SvgAnimate
                      key={idx}
                      svgIndex={svgIndex}
                      svgStyle={svgStyles[idx]} 
                      activeIndex={activeIndex} // Pass the active index as a prop
                    />
                  ))}
                </div>{" "}
              </div>
            ))}
          </aside>
        </h1>
      </div>
    </>
  );
}

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  marginTop: "10%",
};

const wordStyle: CSSProperties = {
  fontSize: "2.1rem",
  opacity: 0,
  fontFamily: "monospace",
  textTransform: "uppercase",
  fontWeight: 800,
  transitionProperty: "opacity",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
  transitionDelay: "0s",
  position: "absolute",
  top: "50%",
  // backgroundColor: "green",
  zIndex: 999,
};

const activeStyle: CSSProperties = {
  opacity: 1,
};

const animationStyle: CSSProperties = {
  animationName: "fade-out",
  animationDuration: "20s",
  animationTimingFunction: "ease-in-out",
  animationFillMode: "forwards",
};
