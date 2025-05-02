import React from "react";
import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1117] text-gray-300 py-10 px-6 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link to="/privacy" className="hover:text-white transition duration-200">Privacy</Link>
          <Link to="/blog" className="hover:text-white transition duration-200">Blog</Link>
          <Link to="/article" className="hover:text-white transition duration-200">Article</Link>
          <Link to="/contact" className="hover:text-white transition duration-200">Contact</Link>
        </div>

        {/* Center: Social Icons */}
        <div className="flex gap-5 text-xl">
          <a href="https://github.com/saacidyuusuf" target="_blank" rel="noreferrer" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaYoutube />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          © {year} <span className="text-white font-semibold">Cabdimalik Yuusuf</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
