import React from "react";
import { AboutCourse } from "./components/AboutCourse";
import { IntroSection } from "./components/IntroSection";
import { Lecture } from "./components/Lecture";
import { CourseSection } from "./components/Section";

export function CourseLandingPage() {
  return (
    <div>
      <IntroSection />
      <AboutCourse />
      <div style={{display:"flex", width:"70%", padding:"1rem", justifyContent:"flex-start", margin:"0 auto"}}>
      <h1> Course Content </h1>
      </div>
      <CourseSection />
    </div>
  );
}