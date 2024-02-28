import React, { useState, useRef, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbJson } from "react-icons/tb";
import { HiCodeBracket } from "react-icons/hi2";
import { PiBracketsCurly, PiBracketsCurlyBold } from "react-icons/pi";
import { CiYoutube } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { InputContext } from "../context/context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Write = () => {
  const [open, setOpen] = useState(false);
  const { inputs, addInput } = useContext(InputContext); // Access shared data
  const [currentText, setCurrentText] = useState("");
  const [generatedTexts, setGeneratedTexts] = useState([]);
  const [isCodeInput, setIsCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const inputRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageClick = async () => {
    // Make an API request to fetch the image from Upleash
    try {
      const response = await fetch('YOUR_UPLASH_API_ENDPOINT');
      const data = await response.json();
      const imageSrc = data.image_url;
      setImageUrl(imageSrc);
    } catch (error) {
      console.log('Error fetching image from Upleash:', error);
    }
  };

  const handleYoutubeClick = () => {
    setShowVideo(true);
  };

  const handleTextChange = (event) => {
    setCurrentText(event.target.value);
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
        addInput(code);
        setCode("");
        setIsCodeInput(false);
      }
    } else {
      if (currentText.trim() !== "") {
        addInput(currentText);
        setCurrentText("");
      }
    }
    setGeneratedTexts([]); // Clear generated texts for next use
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleEditInput = (index, newValue) => {
    setGeneratedTexts((prevTexts) => {
      const updatedTexts = [...prevTexts];
      updatedTexts[index] = { ...updatedTexts[index], content: newValue };
      return updatedTexts;
    });
  };

  return (
    <>
      <div className="generatedInput">
        {generatedTexts.map((item, index) => (
          <div className="singleInputGenerated" key={index}>
            {item.type === "text" ? (
              <input
                type="text"
                value={item.content}
                onChange={(e) => handleEditInput(index, e.target.value)}
              />
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
            <button  onClick={handleImageClick} className="img">
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
        <button className="btnpub" onClick={handlePublishClick}>
          Publish
        </button>
      </div>
    </>
  );
};

export default Write;
