import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { InputContext } from "../context/context";

const Sections = () => {
  const { user } = useContext(InputContext);
  const location = useLocation();

  if (!user) return null;

  const getLinkStyle = (path) => ({
    borderBottom: location.pathname === path ? "5px solid #000" : "none",
    paddingBottom: "4px", // space between text and underline
    textDecoration: "none",
  });

  return (
    <>
    <div className="SecNav">
      <Link className="secNavLink" style={getLinkStyle("/")} to="/">
        Community
      </Link>
      <Link className="secNavLink" style={getLinkStyle("/Classroom")} to="/Classroom">
        Classroom
      </Link>
      <Link className="secNavLink" style={getLinkStyle("/Members")} to="/Members">
        Members
      </Link>
      <Link className="secNavLink" style={getLinkStyle("/about")} to="/about">
        About
      </Link>
    </div>
     <hr />
    </>
  );
};

export default Sections;
