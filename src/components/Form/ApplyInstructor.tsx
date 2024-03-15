"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import "../../styles/applyInstructor.css";

export const ApplyInstructor = () => {
  const { register, handleSubmit } = useForm();
  const [view, setView] = React.useState("view");

  const router = useRouter();
  const applyInstructor = async (data: any) => {
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    const userId = userObj.id;
    data.userId = "userId";

    console.log(data);
  };

  return (
    <Box className="instructorApply">
      {view === "view" ? (
        <div>
          <h1>
            Want To Join Our Team? <br /> Spread the knowledge and help students
            start their carier ?
          </h1>
          <hr />
          <br />
          <p>
            You're most welcomed! as We welcome passionate individuals who are
            eager to share their knowledge and contribute to the growth of
            aspiring professionals.
          </p>
          <h2>Main Role of the Instructor: </h2>
          <p>
            As an instructor, you will play a vital role in guiding and
            mentoring students, helping them to kickstart their career in the
            desired field. <br /> You will be responsible for creating and
            delivering high-quality content, providing constructive feedback,
            and supporting students in their learning journey.
          </p>
          <h2>- Conditions and Rules</h2>
          <ul>
            <li>Hold relevant expertise and experience in the field.</li>
            <li>Commit to delivering high-quality instruction.</li>
            <li>Adhere to the platform's code of conduct and policies.</li>
            <li>Provide constructive feedback and support to students.</li>
            <li>
              Work with the platform to ensure a smooth learning experience.
            </li>
          </ul>

          <h4>Apply Now</h4>
          <p>
            To apply as an instructor, you need to provide your CV and National
            ID. You can either upload your CV or provide a link to it.
          </p>
          <div className="applyBtn">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setView("apply")}
            >
              Apply
            </Button>
          </div>
        </div>
      ) : (
        <div className="applyInstForm">
            <div className="applyFormHeading">
        <h1>Apply Now</h1>
        <p>We will be so glad to have you! please fill this form and wait for our response!</p>
        </div>
        <form onSubmit={handleSubmit(applyInstructor)}>
          <FormControl fullWidth>
            <Input {...register("cv")} type="text" placeholder="CV Link" />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>or Upload Your CV</FormLabel>
            <Input {...register("cv")} type="file" />
          </FormControl>

          <FormControl fullWidth>
            <Input {...register("nationalId")} type="text" placeholder="National ID" />
          </FormControl>

          <div className="applybtnForm">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => {
                router.push("/");
              }}
              variant="contained"
            >
              Cancel
            </Button>
          </div>
        </form>
        </div>
      )}
    </Box>
  );
};
