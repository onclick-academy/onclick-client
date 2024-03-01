"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  FormHelperText,
  Textarea
} from "@mui/joy";

const formFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    validation: { required: true, minLength: 6, maxLength: 255 }
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    validation: { required: true, minLength: 6, maxLength: 255 }
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: { required: true, pattern: /\S+@\S+\.\S+/ }
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    validation: { minLength: 6, maxLength: 255 }
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: { required: true, pattern: /^[a-zA-Z0-9]{3,30}$/ }
  },
  {
    name: "confirmPassword",
    label: "confirm",
    type: "password",
    validation: { required: true, pattern: /^[a-zA-Z0-9]{3,30}$/ }
  },
  {
    name: "phoneNum",
    label: "Phone Number",
    type: "tel",
    validation: { required: true, minLength: 6, maxLength: 255 }
  },
  {
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    validation: { required: true }
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["FEMALE", "MALE"],
    validation: { required: true }
  },
  {
    name: "educationLevel",
    label: "Education Level",
    type: "select",
    options: [
      "ELEMENTARY",
      "MIDDLE",
      "HIGH",
      "COLLEGE",
      "UNIVERSITY",
      "MASTER",
      "PHD"
    ],
    validation: { required: true }
  }
];

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleFormSubmit = async (data) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/auth/register",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        method: "POST",
        body: JSON.stringify(data)
      }
    );
    const user = await res.json();
    console.log(user);
  };

  return (
    <Box
      component="form"
      method="POST"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.9,
        width: "95%",
        maxWidth: 500,
        margin: "0 auto"
      }}
      className="form-container"
    >
      {formFields.map((field) => (
        <FormControl key={field.name} error={Boolean(errors[field.name])}>
          <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
          {field.type === "select" ? (
            <>
              <Select
                {...register(field.name)}
                id={field.name}
                name={field.name}
              >
                {field.options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
              {errors[field.name] && (
                <FormHelperText>
                  {errors[field.name].message.toString()}
                </FormHelperText>
              )}
            </>
          ) : field.type == "textarea" ? (
            <>
              <Textarea
                {...register(field.name, field.validation)}
                id={field.name}
                name={field.name}
              />
              {errors[field.name] && (
                <FormHelperText>
                  {errors[field.name].message.toString()}
                </FormHelperText>
              )}
            </>
          ) : (
            <>
              <Input
                {...register(field.name, field.validation)}
                id={field.name}
                type={field.type}
                name={field.name}
              />
            </>
          )}
        </FormControl>
      ))}
      <Button type="submit" variant="solid">
        Submit
      </Button>
    </Box>
  );
};

export default RegisterForm;
