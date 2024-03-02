import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import React from "react";

export function GetCode({ register }) {
  return (
    <>
      <h1>Please Enter enter your code.</h1>
      <FormControl key={"code"}>
        <FormLabel htmlFor="code">Code</FormLabel>
        <Input
          id="code"
          type="code"
          {...register("code", {
            required: "This is required",
          })}
        />
        {/* <FormHelperText error>{errors.email?.message}</FormHelperText> */}
      </FormControl>

      <Button type="submit" variant="solid">
        Submit
      </Button>
      <Button type="button" variant="solid">
        Cancel
      </Button>
    </>
  );
}
