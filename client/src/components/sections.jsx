import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InputContext } from "../context/context"; // Import the context

const Sections = () => {
  const { user } = useContext(InputContext); // Get user from context

  // Render nothing if the user is not logged in
  if (!user) {
    return null; // Do not render anything if the user is not authenticated
  }

  return (
    <div className="SecNav">
      <Link className="secNavLink" style={{ textDecoration: "none" }} to="/">
        Community
      </Link>
      <Link className="secNavLink" style={{ textDecoration: "none" }} to="/Classroom">
        Classroom
      </Link>
      <Link className="secNavLink" style={{ textDecoration: "none" }} to="/Members">
        Members
      </Link>
      <Link className="secNavLink" style={{ textDecoration: "none" }} to="/about">
        About
      </Link>
    </div>
  );
};

export default Sections;