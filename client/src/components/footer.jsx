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
          <Link>
            <p>Privacy</p>
          </Link>
          <Link>
            <p>Blog</p>
          </Link>
          <Link>
            <p>Article</p>
          </Link>
          <Link>
            <p>Contact</p>
          </Link>
        </div>
        <div className="iconsFooters">
          <FaGithub className="iconf" />
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
