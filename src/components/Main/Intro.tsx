import React from "react";
import ReviewCounter from "./Reviewcounter";
import Image from "next/image";
import intro3 from "../../img/intro3.jpeg";
import intro4 from "../../img/intro4.jpeg";
import intro1 from "../../img/intro1.png";
import intro2 from "../../img/intro2.png";
import ceo from "../../img/ceo.png";
import style from "./Intro.module.css";
import { Button } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IntroVideo from "./IntroVideo";

export default function Intro() {
  return (
    <div className={style["intro-container"]}>
      <div className={style["left-container"]}>
        <div className={style["left-side"]}>
          <ReviewCounter totalReviews={2400} />
          <Image
            alt={"intro"}
            src={intro4}
            style={{ height: "360px", borderRadius: "7px" }}
          />
        </div>

        <div style={{position:"relative"}}>
          <Image alt={"intro"} src={intro3}  className={style["play-image"]} />
          <IntroVideo />
        </div>
      </div>
      <div className={style["right-container"]}>
        <div>
          <div>
            <div style={{ width: "100%", color: "#553CDF" }}>
              <p>
                <TipsAndUpdatesIcon /> Gateway to Lifelong Learning
              </p>
            </div>
            <h1>Know Studyhub Empowering Learners Worldwide</h1>
            <p>
              We are passionate about education and dedicated to providing high-
              quality learning resources for learners of all backgrounds.
            </p>
          </div>
          <div className={style["container-icons"]}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Image
                alt={"intro"}
                src={intro1}
                style={{ borderRadius: "7px" }}
              />
              <div style={{ width: "100%" }}>
                <h3 style={{ height: "9px" }}>Learn with Expert</h3>
                <p style={{ color: "#979caa" }}>We are passionate education.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Image
                alt={"intro"}
                src={intro2}
                style={{ borderRadius: "7px" }}
              />
              <div>
                <h3 style={{ height: "9px" }}>Expert Instructor</h3>
                <p style={{ color: "#979caa" }}>We are passionate education</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ paddingTop: "5%", display: "flex", alignItems: "center" , gap:"3%"}}
        >
          <Image
            alt={"intro"}
            src={ceo}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              border: "1px solid #553CDF",
            }}
          />
          <div>
            <h3 style={{ height: "9px" }}>Adel James Shakal</h3>
            <p style={{ color: "#979caa" }}>CEO, OnClick Online Education</p>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4f35e2",
              color: "white",
              marginLeft: "10%",
              height: "50px",
              width: "120px",
              "&:hover":{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "1px solid #4f35e2",
              },
            }}
          >
            About Us
          </Button>
          
        </div>
      </div>
    </div>
  );
}
