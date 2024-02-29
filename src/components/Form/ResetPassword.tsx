"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input } from "@mui/joy";

const ResetPasswordForm = () => {

  let userId = "";
  let token = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/auth/password/resetpassword/${userId}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const user = await res.json();
    console.log(user);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
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
      <h1>Reset Your Password.</h1>
      <FormControl key={"password"}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 8,
              message: "Minimum length should be 6",
            },
          })}
        />
      </FormControl>
      <FormControl key={"confirmPassword"}>
        <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
        <Input
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: "This is required",
            minLength: {
              value: 8,
              message: "Minimum length should be 6",
            },
          })}
        />
      </FormControl>
      <Button type="submit" variant="solid" color="primary">
        Reset Password
      </Button>
      <Button type="submit" variant="solid" color="warning">
        Cancel
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
