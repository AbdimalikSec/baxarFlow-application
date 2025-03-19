# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




nothing working when i highlight the text i want the two button to be displayed and when i click one of it like bold ar font i want the text to become bold import React, { useState, useRef, useContext } from "react";

import { FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";

import { TbJson } from "react-icons/tb";

import { HiCodeBracket } from "react-icons/hi2";

import { PiBracketsCurly } from "react-icons/pi";

import { CiYoutube } from "react-icons/ci";

import { CiImageOn } from "react-icons/ci";

import { InputContext } from "../context/context";

import Upload from "./upload";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useNavigate } from "react-router-dom";



const Write = () => {

  const [open, setOpen] = useState(false);

  const { addInput, generatedTexts, setGeneratedTexts } =

    useContext(InputContext); // Access shared data

  const [currentText, setCurrentText] = useState("");

  const [isCodeInput, setIsCodeInput] = useState(false);

  const [code, setCode] = useState("");

  const inputRef = useRef(null);

  const [showVideo, setShowVideo] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [currentFormatting, setCurrentFormatting] = useState({

    bold: false,

    fontSize: "1rem",

  });

  const [showFormattingButtons, setShowFormattingButtons] = useState(false);



  const inputRefHightlight = useRef(null);



  const handleHighlight = (e) => {

    if (e.target === inputRefHightlight.current) {

      setCurrentFormatting({ bold: false, fontSize: "1rem" }); // Reset formatting on new highlight

      setShowFormattingButtons(true); // Show buttons

    } else {

      setShowFormattingButtons(false); // Hide buttons on click outside

    }

  };



  const showFormattingButtonsStyle = showFormattingButtons

    ? { display: "block" }

    : { display: "none" }; // I



  const handleImageClick = async () => {

    // Make an API request to fetch the image from Upleash

    try {

      const response = await fetch("YOUR_UPLASH_API_ENDPOINT");

      const data = await response.json();

      const imageSrc = data.image_url;

      setImageUrl(imageSrc);

    } catch (error) {

      console.log("Error fetching image from Upleash:", error);

    }

  };



  const handleYoutubeClick = () => {

    setShowVideo(true);

  };



  const handleTextChange = (event) => {

    setCurrentText(event.target.value);

  };



  const handleCodeChange = (event) => {

    setCode(event.target.value);

  };



  const handleKeyPress = (event) => {

    if (event.key === "Enter") {

      event.preventDefault();



      if (isCodeInput) {

        if (code.trim() !== "") {

          setGeneratedTexts((prevTexts) => [

            ...prevTexts,

            { type: "code", content: code },

          ]);

          setCode("");

          setIsCodeInput(false);

        }

      } else {

        if (currentText.trim() !== "") {

          setGeneratedTexts((prevTexts) => [

            ...prevTexts,

            { type: "text", content: currentText },

          ]);

          setCurrentText("");

        }

      }

      inputRef.current.focus();

    }

  };



  const handlePublishClick = () => {

    if (isCodeInput) {

      if (code.trim() !== "") {

        // addInput({ type: "code", content: code });

        setCode("");

        setIsCodeInput(false);

      }

    } else {

      if (currentText.trim() !== "") {

        //addInput(currentText);

        setCurrentText("");

      }

    }

    // setGeneratedTexts([]); // Clear generated texts for next use

  };



  const handleEditInput = (index, newValue) => {

    setGeneratedTexts((prevTexts) => {

      const updatedTexts = [...prevTexts];

      updatedTexts[index] = { ...updatedTexts[index], content: newValue };

      return updatedTexts;

    });

  };



  const handleRemoveEntry = (index) => {

    setGeneratedTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));

  };

  /*  const handlekeydown = (e) => {

    e.target.style.fontWeight = "bold";

    e.target.style.fontSize = "3rem";

  }; */



  const applyFormatting = (text, formatting) => {

    let formattedText = text;



    if (formatting.bold) {

      formattedText = `<strong>${formattedText}</strong>`; // Wrap in bold tags

    }



    if (formatting.fontSize) {

      formattedText = `<span style="font-size: ${formatting.fontSize}">${formattedText}</span>`; // Wrap in span with font size

    }



    return formattedText;

  };



  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      const currentIndex = e.target.closest('.singleInputGenerated').dataset.index; // Get index from data-index attribute

      const formattedText = applyFormatting(e.target.value, currentFormatting);

      handleEditInput(currentIndex, formattedText);

    }

  };



  return (

    <>

      <div className="generatedInput">

        {generatedTexts.map((item, index) => (

          <div

            className="singleInputGenerated"

            key={index}

            ref={inputRefHightlight}

            onMouseDown={handleHighlight}

          >

            {item.type === "text" ? (

              <>

                <input

                  type="text"

                  className="inputCodeKa"

                  value={item.content}

                  style={{

                    fontWeight: currentFormatting.bold ? "bold" : "normal",

                    fontSize: currentFormatting.fontSize,

                  }}

                  onKeyDown={(e) => handleKeyDown(e)}

                  onChange={(e) => handleEditInput(index, e.target.value)}

                />

                {showFormattingButtons && (

                  <div style={showFormattingButtonsStyle}>

                    <button

                      onClick={() =>

                        setCurrentFormatting({

                          ...currentFormatting,

                          bold: true,

                        })

                      }

                    >

                      B

                    </button>

                    <button

                      onClick={() =>

                        setCurrentFormatting({

                          ...currentFormatting,

                          fontSize: "1.5rem",

                        })

                      }

                    >

                      F

                    </button>

                  </div>

                )}

              </>

            ) : (

              <div className="codeContainer">

                <SyntaxHighlighter language="javascript" style={solarizedlight}>

                  {item.content}

                </SyntaxHighlighter>

              </div>

            )}

          </div>

        ))}



        {showVideo && (

          <div className="videoContainer">

            {/* Replace "VIDEO_ID" with the actual YouTube video ID */}

            <iframe

              width="560"

              height="315"

              src="https://www.youtube.com/embed/CBYHwZcbD-s&list=PPSV"

              title="YouTube Video"

              frameBorder="0"

              allowFullScreen

            ></iframe>

          </div>

        )}

        {imageUrl && <img src={imageUrl} alt="Upleash Image" />}

      </div>



      <div className="write">

        <FaPlus className="plus" onClick={() => setOpen(!open)} />

        <input

          type="text"

          placeholder={isCodeInput ? "Enter code" : "Enter text"}

          value={isCodeInput ? code : currentText}

          onChange={isCodeInput ? handleCodeChange : handleTextChange}

          onKeyDown={handleKeyPress} // Update the event handler to handle key press

          ref={inputRef}

          className={isCodeInput ? "codeInput" : ""}

        />



        {open && (

          <div className="otherIcon">

            <button>

              <TbJson className="writeIcon" />

            </button>

            <button onClick={handleImageClick} className="img">

              <CiImageOn className="writeIcon" />

            </button>

            <button onClick={handleYoutubeClick} className="youtube">

              <CiYoutube className="writeIcon" />

            </button>

            <button className="code" onClick={() => setIsCodeInput(true)}>

              <HiCodeBracket className="writeIcon" />

            </button>

            <button className="baraket">

              <PiBracketsCurly className="writeIcon" />

            </button>

          </div>

        )}

      </div>



      <div className="publish">

        <Link className="btnpub" onClick={handlePublishClick}>

          Publish

        </Link>

        <Link to="/profile" className="btnpub" onClick={handlePublishClick}>

          go

        </Link>

      </div>

    </>

  );

};



export default Write;

 give me all the code u make changes
