import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const formValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export function Login() {
  const navigate = useNavigate();
  const [formState, setformState] = useState("success");
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log("successfully login", values);
        const data = await fetch(
          "https://url-shortener-backend-pink.vercel.app/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (!data.status === 401) {
          console.log("error", data.status);
          setformState("error");
          //  data.status === 401 ? <Alert severity="error"><AlertTitle>Error</AlertTitle>This is an error alert — <strong>check it out!</strong></Alert> : "null"
        } else {
          setformState("success");
          const result = await data.json();
          console.log("success", result);
          localStorage.setItem("token", result.token);
          navigate("/urls");
        }
      },
    });
  return (
    <form className="login" onSubmit={handleSubmit}>
      <Card className="login-page">
        <CardContent className="login-page-content">
          <h3>Login</h3>
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
          <Button type="submit" color={formState} variant="contained">
            {formState === "success" ? "Submit" : "retry"}
          </Button>
          <Link
            className="forget-password-link"
            onClick={() => navigate("/forgetpassword")}
          >
            Forget password
          </Link>
        </CardContent>
      </Card>
    </form>
  );
}
