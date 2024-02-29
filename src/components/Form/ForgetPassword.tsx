"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgetFormSubmit = async (data: any) => {
    console.log('data', data);
    // fetching and all over
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/password/forgetpassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const user = await res.json();
    console.log(user);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleForgetFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: 500,
        m: "auto",
        p: 2,
        gap: 2,
      }}
    >
      <h1>Please Enter Your Email To Reset Your Password.</h1>
      <FormControl key={"email"}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Wrong Email Format",
            },
          })}
        />
        {/* <FormHelperText error>{errors.email?.message}</FormHelperText> */}
      </FormControl>

      <Button type="submit" variant="solid">
        Submit
      </Button>
    </Box>
  );
};

export default ForgetPasswordForm;
