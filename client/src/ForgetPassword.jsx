import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const formValidationSchema = yup.object({
  email: yup.string().required().min(6).email(),
});

export function ForgetPassword() {
  const navigate = useNavigate();
  const successnotify = (data) => toast.success(data);
  const warningnotify = (data) => toast.warning(data);
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        // console.log("Update password successfully", values);
        // navigate("/login");
        const data = await fetch(
          "https://url-shortener-backend-pink.vercel.app//user/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message !== "email not found") {
              successnotify(" Link sent successfully to your email");
              setTimeout(() => {
                navigate("/otp-page");
              }, 5000);
            } else {
              warningnotify(data.message);
            }
          });
        navigate("/otp-page");
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="forget-password">
        <CardContent>
          <h3>Forget password</h3>
          <div className="forget-password-textfiled">
            <TextField
              id="outlined-basic"
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : null}
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Enter email"
              variant="outlined"
            />
          </div>
          <div className="forget-password-button">
            <Button
              variant="contained"
              sx={{ marginLeft: "auto" }}
              color="primary"
              type="submit"
            >
              Ok
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/login")}
              type="submit"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
