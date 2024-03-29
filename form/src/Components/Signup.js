import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import logo from "./Images/icon.png";
import { Link, Navigate } from "react-router-dom";
// import Notifications, { notify } from "react-notify-toast";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

// import Form from "react-bootstrap/Form";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Signup">
      <div className="col-md-6 offset-md-3">
        <div className="logo">
          <img src={logo} className="img-fluid"></img>
        </div>
        <div className="Signup-name">
          <TextField
            required
            id="outlined-required"
            label="Name"
            className="input"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            //   defaultValue="Hello World"
          />
        </div>
        <div className="Signup-email">
          <TextField
            required
            id="outlined-required"
            label="Email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //   defaultValue="Hello World"
          />
        </div>
        <div className="Signup-passwd">
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
            Register
          </button>
        </div>
        <div className="submit">
          <Link
            to="/"
            // type="submit"
            class="btn btn-primary"
            // onClick={submit}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
