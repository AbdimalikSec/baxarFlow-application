import React from "react";
import ClassCard from "./ClassCard";
import classromecss from "../components/classRome.module.css"
import { hack } from "../assets";

const ClassRome = () => {
  return (
    <div>
    {/*   <h1 className={classromecss.classroomeH1}>ClassRome</h1> */}
      <div className={classromecss.classRomeBox}>
        <ClassCard title={"Start Here"} desc={"Just joined? Click here first!"} img={hack}/>
        <ClassCard title={"Cybersecurity Projects-Resources"} desc={"Need hands-on projects and extra FREE cybersecurity resources used by real Analysts? This is a goldmine..."} img={hack}/>
        <ClassCard title={"Cybersecurity Fundamentals"} desc={"Cybersecurity Fundamentals, what more could you want?"} img={hack}/>
      </div>
    </div>
  );
};

export default ClassRome;
