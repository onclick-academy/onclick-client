"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { GetEmail } from "./GetEmailForm";
import { GetCode } from "./GetCodeForm";
import "../../app/style.scss";


// TODO create another component for vliadation code
const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [isForget, setIsForget] = React.useState(true);
  const router = useRouter();

  const handleForgetFormSubmit = async (data: any) => {
    try {
      console.log("data", data);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/password/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const user = await res.json();
      setIsForget(false);
      console.log(user);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleCodeFormSubmit = async (data: any) => {
    try {
      console.log("data", data);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/auth/password/verifycode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            code: data.code
          })
        }
      );
      const co = await res.json();
      console.log(co);
      if (co.status === "success") {
        router.push(`/resetpassword?email=${data.email}&code=${data.code}`);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(
        isForget ? handleForgetFormSubmit : handleCodeFormSubmit
      )}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: 500,
        m: "auto",
        p: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      {isForget ? (
        <GetEmail register={register} />
      ) : (
        <GetCode register={register} />
      )}
    </Box>
  );
};

export default ForgetPasswordForm;
