import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const formValidationSchema = yup.object({
  password_1: yup.string().required().min(6),
  password_2: yup.string().required().min(6),
});

export function ChangePassword() {
  const { email } = useParams();
  const [Email, setemail] = useState(null);

  useEffect(() => {
    fetch(`https://url-shortener-backend-pink.vercel.app/user/${email}`)
      .then((data) => data.json())
      .then((data) => setemail(data));
  }, [email]);
  console.log(movie);
  return Email ? (
    <NewPassword movie={movie} />
  ) : (
    <div className="loading">
      <CircularProgress />
    </div>
  );
}

export function NewPassword({ Email }) {
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        password_1: "",
        password_2: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (updatedpassword) => {
        if (password_1 === password_2) {
          updatepassword(updatedpassword);
        } else {
          console.log("New Password and Confirm password must be same");
        }
        // console.log("Form values",updatedpassword);
        // updatepassword(updatedpassword);
      },
    });
  const updatepassword = async (updatepassword) => {
    // console.log(updatepassword);

    await fetch(`https://url-shortener-backend-pink.vercel.app/user/${Email.email}`, {
      method: "PUT",
      body: JSON.stringify(updatepassword),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/login");
    console.log(updatepassword);
  };
  return (
    <Card className="new-password">
      <CardContent>
        <h3>Create New Password</h3>
        <hr />
        <div className="new-password-content">
          <TextField
            id="outlined-basic"
            error={errors.password_1 && touched.password_1}
            helperText={
              errors.password_1 && touched.password_1 ? errors.password_1 : null
            }
            value={values.password_1}
            onChange={handleChange}
            onBlur={handleBlur}
            label="new password"
            variant="outlined"
            name="password_1"
          />
          <TextField
            id="outlined-basic"
            error={errors.password_2 && touched.password_2}
            helperText={
              errors.password_2 && touched.password_2 ? errors.password_2 : null
            }
            value={values.password_2}
            onChange={handleChange}
            onBlur={handleBlur}
            label="confirm password"
            variant="outlined"
            name="password_2"
          />
          <p>
            Create new password and the password must be minimun 6
            characters
          </p>
        </div>
        <div className="otp-page-button">
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            color="success"
            type="submit"
            onClick={() => navigate("/login")}
          >
            Done
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/login")}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
