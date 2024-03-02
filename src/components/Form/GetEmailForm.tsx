import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import React from "react";

export const GetEmail = ({register}) => {

  return (
    <>
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
      <Button type="submit" variant="solid">
        Cancel
      </Button>
    </>
  );
};
