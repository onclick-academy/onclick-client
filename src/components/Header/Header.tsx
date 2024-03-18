import React from "react";
import Nav from "../Nav/Nav";
import StylingTransition from "./AnimatedHeader";
export default function Header() {
  return (
    <div
      style={{
        width: "100%",
        backgroundImage:
          "linear-gradient(60deg, #29323c 0%, #485563 100%)",
      }}
    >
      <Nav />
      <StylingTransition />
      
    </div>
  );
}
