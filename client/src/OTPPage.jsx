import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function OTPPage() {
  const navigate = useNavigate();
  return (
    <Card className="otp-page">
      <CardContent>
        <h3>Verification</h3>
        <hr />
        <div className="otp-page-content">
          <TextField
            id="outlined-basic"
            label="OTP"
            variant="outlined"
            sx={{ alignItems: "center" }}
          />
          <p>
            Check your Email and please enter your validate number, and then
            continue to create new password.
          </p>
        </div>
        <div className="otp-page-button">
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            color="success"
            type="submit"
            onClick={() => navigate("/newpassword")}
          >
            Ok
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
