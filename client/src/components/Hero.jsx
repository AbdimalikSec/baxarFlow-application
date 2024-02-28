import React from 'react'
import { heroImg,heroImg2 } from '../assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
        <img src={heroImg2} alt="" />
        <div className="heroText">
        <h1>Home of Discovery And Education</h1>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
        <Link className='discover' to='/'>Discover</Link>
        </div>
    </div>
  )
}

export default Hero