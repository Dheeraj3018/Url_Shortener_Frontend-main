import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ForgetPassword } from "./ForgetPassword";
import { Home } from "./Home";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { NewPassword } from "./NewPassword";
import { OTPPage } from "./OTPPage";
import { PageNotFound } from "./PageNotFound";

const formValidationSchema = yup.object({
  url: yup.string().required().min(6).url(),
});

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const [show, setshow] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: show ? "dark" : "light",
    },
  });

  const bgstyle = {
    borderRadius: "0px",
    minHeight: "100vh",
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button
                color="inherit"
                sx={{ marginLeft: "auto" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
              <IconButton color="inherit" onClick={() => setshow(!show)}>
                {show ? <BrightnessHighIcon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/urls"
              element={
                <ProductedRoute>
                  <UrlsPage />
                </ProductedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/otp-page" element={<OTPPage />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

function ProductedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <section>{children}</section> : <Navigate replace to="/" />;
}

function logout() {
  localStorage.removeItem("token");
  // localStorage.clear();
  window.location.href = "/"; // one time refresh
}

function UrlDashboarad() {
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        url: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newurl) => {
        console.log("Form values", values);
        addurl(newurl);
        navigate("/urls");
      },
    });

  const addurl = async (newurl) => {
    await fetch(" https://url-shortener-backend-pink.vercel.app/url", {
      method: "POST",
      body: JSON.stringify(newurl),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/urls");
    console.log(newurl);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="url-dashboard">
        <TextField
          sx={{ minWidth: "500px" }}
          type="text"
          error={errors.url && touched.url}
          helperText={errors.url && touched.url ? errors.url : null}
          value={values.url}
          name="url"
          onChange={handleChange}
          onBlur={handleBlur}
          id="outlined-basic"
          label="Enter or paste url"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Add url
        </Button>
      </div>
    </form>
  );
}

function UrlCard({ data }) {
  return (
    <Card className="url-card">
      <CardContent>
        <a href={data.url}>{data.shorturl}</a>
        <p>The lengthy url was converted into short url 🎈🎈🎈🎈✨🥳 </p>
      </CardContent>
    </Card>
  );
}

function UrlList() {
  const [urlList, seturlList] = useState([]);

  useEffect(() => geturl(), []);

  const geturl = () => {
    fetch("https://url-shortener-backend-pink.vercel.app//url", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => seturlList(data));
  };

  return (
    <div className="url-card">
      {urlList.map((ele) => (
        <UrlCard data={ele} key={ele._id} />
      ))}
    </div>
  );
}

function UrlsPage() {
  return (
    <div>
      <div className="url-text-box">
        <h3 className="url-content">
          {" "}
          This Page granted to convert lengthy url into short url (
          url-shortener ){" "}
        </h3>
        <UrlDashboarad />
      </div>
      <div className="url-card-box">
        <UrlList />
      </div>
    </div>
  );
}
