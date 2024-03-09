import React, { useState } from "react";
import { InputContext } from "../context/context";
import { useContext } from "react";
import { nin1 } from "../assets";

import {
  FaAccessibleIcon,
  FaAd,
  FaAdjust,
  FaSave,
  FaAddressCard,
  FaComment,
  FaComments,
  FaLock,
  FaCloudShowersHeavy,
} from "react-icons/fa";

const UserPublished = () => {
  const [isResponse, setResponse] = useState(false);
  const { user } = useContext(InputContext);


  return (
    <>
      <div className="userpublished">
        <h1>Context published Title</h1>
        <div className="userpublishedName">
          <img src={nin1} alt="" />
          <p>Name user</p>
        </div>
        <div className="userPublishedIcon">
          <div className="publishIcon">
            <p>
              <FaComments onClick={() => setResponse(!isResponse)} />
            </p>
            <p>
              <FaAccessibleIcon />
            </p>
          </div>
          <div className="publishIcon">
            <p>
              <FaAd />
            </p>
            <p>
              <FaAdjust />
            </p>
            <p>
              <FaSave />
            </p>
          </div>
        </div>

        {/* published article here */}
        {/* publish textigan waxay tage
        profile userka dhanka homeka */}
        {/* here the icons */}
      </div>

      {isResponse && (
        <div className="responseModel">
          <div className="responseHeader">
            <div className="flexresponseHeader">   
            <div>
              <h1>Response</h1>
            </div>
            <div>
              <FaCloudShowersHeavy />
              <FaLock />
            </div>
            </div>
            <img src={nin1} alt="" />
            <textarea
              placeholder="What is your idea"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="textareaBottom">
            <p>B</p>
            <p>I</p>
            <div>
              <button onClick={() => setResponse(false)}>Cancel</button>
              <button>Response</button>
            </div>
          </div>
          <p>Also Publish to my profile</p>
        </div>
      )}
    </>
  );
};

export default UserPublished;
