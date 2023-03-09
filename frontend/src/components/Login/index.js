import React, { useState,useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import { UserContext } from "../../App";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontFamily } from "@mui/system";




const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState("")

const navigate = useNavigate()
const {handleLogin} = useContext(UserContext)
const handleLoginClick = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post ("http://localhost:5000/users/login/",{
      email,
      password
    })
    const {token} = response.data
    handleLogin(token)
  }
  catch (error){
    setMessage({ text: error.response.data.message, show: true });
  }
}
const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images8.alphacoders.com/473/473471.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "blue" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "sans-serif" }}
            >
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
                onChange={(e) => {
                  // console.log(e.target.value);
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Grid message>
                {message.show && (
                  <p className="message" style={{ color: "red" }}>
                    {message.text}
                  </p>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <p variant="body2">
                    {"Don`t you have an account?"} <Link to="/register" > Register 
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login

