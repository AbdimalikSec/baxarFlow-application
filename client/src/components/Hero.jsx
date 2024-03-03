import { heroImg, heroImg2 } from '../assets';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { InputContext } from '../context/context';

const Hero = () => {
  const { user } = useContext(InputContext);

  return !user ? (
    <div className="hero">
      <img src={heroImg2} alt="" />
      <div className="heroText">
        <h1>Home of Discovery And Education</h1>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
        <Link className="discover" to="/">
          Discover
        </Link>
      </div>
    </div>
  ) : (
    <div className="hero displayHeroNone">
      <img src={heroImg2} alt="" />
      <div className="heroText">
        <h1>Home of Discovery And Education</h1>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
        <Link className="discover" to="/">
          Discover
        </Link>
      </div>
    </div>
  );
};

export default Hero;