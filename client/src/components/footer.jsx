import React from "react";
import { FaGithub, FaTwitter, FaYoutube, FaCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const footer = () => {
  const date = new Date();
  const getFullYear = date.getFullYear();
  return (
    <footer>
      <div className="footerDiv">
        <div className="policyDiv">
          <Link style={{ textDecoration: "none" }}>
            <p>Privacy</p>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <p>Blog</p>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <p>Article</p>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <p>Contact</p>
          </Link>
        </div>
        <div className="iconsFooters">
          <a href="https://github.com/saacidyuusuf">
            <FaGithub className="iconf" />
          </a>
          <FaTwitter className="iconf" />
          <FaYoutube className="iconf" />
        </div>
        <div className="developeby">
          <h5>
            <FaCopyright />
            Cabdimalik Yuusuf
            {getFullYear}
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default footer;
