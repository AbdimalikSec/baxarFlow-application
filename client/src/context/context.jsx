import React, { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [inputs, setInputs] = useState([]);

  const addInput = (text) => {
    setInputs((prevInputs) => [...prevInputs, text]);
  };
 
  return (
    <InputContext.Provider value={{ inputs, addInput }}>
      {children}
    </InputContext.Provider>
  );
};



/* 

no no i want first when i enter something and say enter in keyboard the text to go in into new input and when i enter text again and say enter i want text to go to another input and when i click publish button i want to display them the texts that i have putted in input  without the input  understand me and if i click publish when i enter text i want i want that to be displays without input i'm making that becouse i want to have the ability to edit the inputs but first just make this work not edit yet
*/

/* 


i have this context import React, { createContext, useState } from "react";



export const InputContext = createContext();



export const InputProvider = ({ children }) => {

  const [inputs, setInputs] = useState([]);



  const addInput = (text) => {

    setInputs((prevInputs) => [...prevInputs, text]);

  };

 

  return (

    <InputContext.Provider value={{ inputs, addInput }}>

      {children}

    </InputContext.Provider>

  );

};

and here i'm doing this import React, { useState, useRef, useContext } from "react";

import { FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";

import { TbJson } from "react-icons/tb";

import { HiCodeBracket } from "react-icons/hi2";

import { PiBracketsCurly, PiBracketsCurlyBold } from "react-icons/pi";

import { CiYoutube } from "react-icons/ci";

import { CiImageOn } from "react-icons/ci";

import { InputContext } from "../context/context";



const Write = () => {

  const { inputs, addInput } = useContext(InputContext);

  const [currentText, setCurrentText] = useState("");

  const inputRef = useRef(null);



  const handleTextChange = (event) => {

    setCurrentText(event.target.value);

  };



  const handleKeyPress = (event) => {

    if (event.key === "Enter") {

      event.preventDefault();

      if (currentText.trim() !== "") {

        addInput(currentText);

        setCurrentText("");

      }

      inputRef.current.focus();

    }

  };



  const handlePublishClick = () => {

    if (currentText.trim() !== "") {

      addInput(currentText);

      setCurrentText("");

    }

  };





  return (

    <>

        {inputs.map((input, index) => (

          <div key={index}>

            <input type="text" value={input} readOnly />

          </div>

        ))}

      <div className="write">

        <input

          type="text"

          placeholder="Enter text"

          value={currentText}

          onChange={handleTextChange}

          onKeyPress={handleKeyPress}

          ref={inputRef}

        />

      </div>





      <div className="publish">

        <button className="btnpub" onClick={handlePublishClick}>

          Publish

        </button>

      </div>

    </>

  );

};



export default Write; something is wrong when i have a input that i write text with and when i do i click enter in keyboard and when i say it and that text goes to input that is generated when ever i click enter in keyboard now let say i write my input with one text say hello and i say enter and input is generated and i write in again and click enter and another input is generated know i have 2 input with that is inside of it the text i wrote in my input know when i click the button publish

want first when i enter something and say enter in keyboard the text to go in into new input and when i enter text again and say enter i want text to go to another input and when i click publish button i want to display them the texts that i have putted in input  without the input  understand me and if i click publish when i enter text i want i want that to be displays without input i'm making that becouse i want to have the ability to edit the inputs but first just make this work not edit yet


*/