import React from "react";
import A4Animation from "../TextReaveal/A4Layout";
import Cursor from "../Cursor/Cursor";
import Nav from "../Nav/Nav";
import StylingTransition from "../Header/Headtrial";
export default function Header() {
  return (
    <div>
      <Nav />
      {/* <Cursor />
      <A4Animation /> */}
      <StylingTransition />
    </div>
  );
}
