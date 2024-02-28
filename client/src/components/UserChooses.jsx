import React from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./userSidebar";
import { useState } from "react";
import ChooseData from "./ChooseData";
import BookCard from "./articleCard";
import article from "./data";

const UserChooses = () => {
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);
  const [isSelected, setSelected] = useState(false);

  /* className={`sidebarHome ${isSidebarSticky ? "sticky-bottom" : ""}`} */

  /*   const clickHandler = () =>{
    setSelected(() => isSelected == ChooseData.length - 1 ? 0 : isSelected + 1 );
  }
 */
  return (
    <>
      <div className="chooseHaye">
        <h1>UserChooses </h1>
        <div className="userChoses">
          {ChooseData.map((category, index) => (
            <>
              <div className="chooseOne" key={index}>
                <Link
                  onClick={() => setSelected(index)}
                  key={index}
                  className={isSelected == index ? "chosedOne" : "wow"}
                  to="/userchooses"
                >
                  <p>
                  {category.category}
                  </p>
                </Link>
              </div>
            </>
          ))}

          <div className="articleUserHaye">
            <div className="articleUser">
              {article.map((articleItem) => (
                <BookCard key={articleItem.id} article={articleItem} />
              ))}
            </div>
            <div
              className={`sidebarUser ${
                isSidebarSticky ? "sticky-bottom" : ""
              }`}
            >
              <UserSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChooses;

/* 

import Image from 'next/image';
import { useState} from "react";
import { TestiData } from "./TestiData";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BsBraces } from "react-icons/bs";
const Corousel = () => {
  const [slide, setslide] = useState(0);

  const nextSlide = () => {
    setslide(slide === TestiData.length - 1 ? 0 : slide + 1  );
  };
  const prevSlide = () => {
    setslide(slide === 0 ? TestiData.length - 1 : slide - 1 );
  };

  return (
    <>
      <h1 className='testiTitle'>Testimonial</h1>
    <section className="testimonial">
    <div className="flex">
      <FaAngleLeft className="left" onClick={prevSlide}/>
      {TestiData.map((data, index) => {
        return (
          <div
            key={index}
            className={slide === index ? "haye" : "haye haye-hidden"}>
            <div className="bracesHaye">
            <BsBraces className='braces'/>
            <h3 className='bracesText'>Our Client for past months </h3>
            </div>
            <p>{data.desc}</p>
            <div className="wrap">
            <Image className="image" src={data.img} alt="" />
            <h1>{data.name}</h1>
            </div>
          </div>
        );
      })}
      <FaAngleRight className="right" onClick={nextSlide} />
      <span className="indicators">
        {TestiData.map((_, index) => {
          return (
            <button
              onClick={() => setslide(index)}
              key={index}
              className={slide === index ? "indicator" : "indicator-inactive"}
            ></button>
          );
        })}
      </span>
    </div>
    </section>
    </>
  );
};

export default Corousel;



*/
