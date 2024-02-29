import React, { useState, useEffect, useContext } from "react";
import Articles from "../components/articles";
import Sidebar from "../components/Homesidebar";
import Footer from "../components/footer";
import Hero from "../components/Hero";
import Heroafter from "../components/HeroNext";
import { InputContext } from "../context/context";
import SyntaxHighlighter from "react-syntax-highlighter";

// ... other imports

const home = () => {
  const { inputs } = useContext(InputContext); // Access shared data
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);
  
  // No changes needed in render function, as it already displays published texts.

 
  return (
    <>
      <Hero />
      <Heroafter />
      <div className="homeFlex">
        <div>
          <Articles />
        </div>
        <div
          className={`sidebarHome ${isSidebarSticky ? "sticky-bottom" : ""}`}
        >
          <Sidebar />
        </div>
      </div>
      {/* Display published texts without input elements */}
      <div className="HomeGeneratedArray">
      {inputs.map((text, index) => (
          <div key={index} className="singleInputGenerated">
            {text.type === "code" ? (
              <SyntaxHighlighter language="javascript">
                {text.content}
              </SyntaxHighlighter>
            ) : (
              <span>{text.content}</span>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default home;
