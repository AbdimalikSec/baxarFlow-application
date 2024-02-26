import React from "react";
import Articles from "../components/articles";
import Sidebar from "../components/sidebar";
import { useState,useEffect } from "react";
const home = () => {
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector(".sidebar");
      const articleContainer = document.querySelector(".article-container");

      if (sidebar && articleContainer) {
        const sidebarHeight = sidebar.offsetHeight;
        const articleContainerHeight = articleContainer.offsetHeight;
        const scrollY = window.scrollY;

        if (
          scrollY + window.innerHeight >=
          articleContainerHeight + sidebarHeight
        ) {
          setIsSidebarSticky(true);
        } else {
          setIsSidebarSticky(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="homeFlex">
        <div>
          <Articles />
        </div>
        <div
          className={`sidebar ${isSidebarSticky ? "sticky-bottom" : ""}`}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default home;
