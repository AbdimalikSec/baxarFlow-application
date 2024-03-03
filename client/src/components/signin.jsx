import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpLink = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {}, [value, setValue]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/sql/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(value), // Convert value to JSON
      headers: {
        "Content-Type": "application/json", // Add Content-Type header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          navigate("/");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log("An error occurred");
        }
      });
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="signUpContext">
      <h1>Sign Up</h1>
      <form onSubmit={HandleSubmit}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          name="email"
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          onChange={(e) => setValue({ ...value, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
        <Link to="">
          <FaGoogle className="google" onClick={google} />
        </Link>
        <Link to="">
          <FaGithub className="github" onClick={github} />
        </Link>
      </form>
    </div>
  );
};

export default SignUpLink;
