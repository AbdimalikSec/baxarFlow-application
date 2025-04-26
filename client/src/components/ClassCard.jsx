import React from 'react'
import classCardCss from '../components/classcard.module.css'
import { Link } from 'react-router-dom'
const ClassCard = ({title, desc, img}) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-"); // convert title to slug
  return (
    <>
    
    <div className={classCardCss.ClassCardbox}>
      <img src={img} width={400} alt="" />
    <Link to={`/class/${slug}`}>
        <h1>{title}</h1>
      <p>{desc}</p>  
    </Link>
    </div>
    </>
  )
}

export default ClassCard