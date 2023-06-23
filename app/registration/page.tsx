"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { styled } from "styled-components";
import { baseTheme } from "../constants/theme";
import Image from "next/image";
import showPasswordBtn from "../assets/svg/eye-outline.svg";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 378px;
  height: 624px;
  margin: 0 auto;

  background: ${baseTheme.colors.dark["300"]};
`;

const StyledTitle = styled.h2`
  color: ${baseTheme.colors.light["100"]};

  font-size: 20px;
  font-weight: 700;
  line-height: 36px;
`;

const StyledForm = styled(Form)`
  color: #8d9094;

  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    font-size: 16px;
    width: 330px;
    height: 80px;
  }
`;

const StyledField = styled(Field)`
  font-size: 14px;
  width: 100%;
  height: 36px;
  border: 1px solid ${baseTheme.colors.dark["100"]};
`;

const StyledBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  height: 40px;
  width: 330px;

  color: ${baseTheme.colors.light["100"]};
  background: ${baseTheme.colors.accent["500"]};
`;

const StyledShowPasswordBtn = styled(Image)``;

const StyledErrorMsg = styled.div`
  color: ${baseTheme.colors.danger["500"]};
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required username"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
  email: Yup.string().email("Invalid email").required("Required email"),
  passwordConfirmation: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "password mismatch"),
});

export default function Registration() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmationType, setPasswordConfirmationType] =
    useState("password");

  const showPasswordHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const showPasswordConfirmationHandler = () => {
    if (passwordConfirmationType === "text") {
      setPasswordConfirmationType("password");
    } else {
      setPasswordConfirmationType("text");
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Sign Up</StyledTitle>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          const data = {
            email: values.email,
            password: values.password,
            username: values.username,
          };

          try {
            await fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              body: JSON.stringify(data),
            }).then(() => console.log("otpravleno"));
            resetForm();
          } catch {
            console.log("err");
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <label>
              Username
              <StyledField name="username" />
              <StyledShowPasswordBtn
                alt="show password"
                src={showPasswordBtn}
                onClick={() => showPasswordHandler()}
              />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Password
              <StyledField name="password" type={passwordType} />
              <StyledShowPasswordBtn
                alt="show password"
                src={showPasswordBtn}
                onClick={() => showPasswordConfirmationHandler()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Password confirmation
              <StyledField
                name="passwordConfirmation"
                type={passwordConfirmationType}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Email
              <StyledField name="email" type="email" />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </label>
            <StyledBtn type="submit">Sign Up</StyledBtn>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
}
