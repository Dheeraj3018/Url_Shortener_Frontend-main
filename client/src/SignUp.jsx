import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formValidationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export function SignUp() {
  const navigate = useNavigate();
  const [formState, setformState] = useState("success");
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log("successfully sign up", values);
        const data = await fetch(
          "https://url-shortener-backend-pink.vercel.app/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (data.status === 401) {
          console.log("error", data.status);
          setformState("error");
          //  data.status === 401 ? <Alert severity="error"><AlertTitle>Error</AlertTitle>This is an error alert — <strong>check it out!</strong></Alert> : "null"
        } else {
          setformState("success");
          const result = await data.json();
          console.log("success", result);
          localStorage.setItem("token", result.token);
          navigate("/login");
        }
      },
    });
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <Card className="signup-page">
        <CardContent className="signup-page-content">
          <h3>Signup</h3>
          <TextField
            id="outlined-basic"
            error={errors.username && touched.username}
            helperText={
              errors.username && touched.username ? errors.username : null
            }
            value={values.username}
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            label="User name"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            error={errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : null}
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email id"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            error={errors.password && touched.password}
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            label="Password"
            variant="outlined"
          />
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
