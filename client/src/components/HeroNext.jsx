import React from "react";
import { InputContext } from "../context/context";
import { useContext } from "react";

const Heroafter = () => {
  const {user} = useContext(InputContext)
  
  return !user ? (
    <div className="PlaceBaxar">
      <h1>Discover Your solution And Help People Discover them too </h1>
      <p>
        Here you can find ideas you had in mind and discover new ones you going
        to have chnange of prespective you going to fnd all you solutions in
        baxarFlow and if u can help people with learning. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Quia facere mollitia error expedita
        quos quidem unde sapiente voluptatibus, repellat incidunt!
      </p>
    </div>
  ):(
    <div className="PlaceBaxar DiscoverNone">
    <h1>Discover Your solution And Help People Discover them too </h1>
    <p>
      Here you can find ideas you had in mind and discover new ones you going
      to have chnange of prespective you going to fnd all you solutions in
      baxarFlow and if u can help people with learning. Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Quia facere mollitia error expedita
      quos quidem unde sapiente voluptatibus, repellat incidunt!
    </p>
  </div>
  )
  
};

export default Heroafter;
