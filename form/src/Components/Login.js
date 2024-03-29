import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import logo from "./Images/icon.png";
// import Notifications, { notify } from "react-notify-toast";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Form from "react-bootstrap/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    Axios.post("http://192.168.29.139:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "sucess") {
          // save email to localStorage
          navigate("/home")};
        if (result.data === "wrong password") {
          alert("incorect password");
        }
        if (result.data === "no record exists") {
          alert("No user found");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <div className="col-md-6 offset-md-3">
        <div className="logo">
          <img src={logo} className="img-fluid"></img>
        </div>
        <div className="login-email">
          <TextField
            required
            id="outlined-required"
            label="Name"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //   defaultValue="Hello World"
          />
        </div>
        <div className="login-passwd">
          <TextField
            required
            id="outlined-required"
            label="Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //   defaultValue="Hello World"
          />
        </div>
        <div className="submit">
          <button type="submit" class="btn btn-primary" onClick={submit}>
            Login
          </button>
        </div>
        <div className="create-new-acc">
          <Link to="/signup">create new account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
