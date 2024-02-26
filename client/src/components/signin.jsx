import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpLink = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signUpContext">
      <h1>Sign Up</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
