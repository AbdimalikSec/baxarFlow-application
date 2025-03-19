import React, { useContext } from "react";
import Articles from "../components/articles";
import Sidebar from "../components/Homesidebar";
import Footer from "../components/footer";
import Write from '../components/Write';
import { InputContext } from "../context/context";
import ChooseCategory from "../components/Choose";

const Home = () => {
  const { user } = useContext(InputContext);

//  console.log("User in Home:", user);

  return (
    <>
    
      <Write />
      <div className="homeFlex">
        <div className="flex-Category-Article">
          <ChooseCategory />
          <Articles />
        </div>
        {user && (
          <div className={`sidebarHome`}>
            <Sidebar />
            {/* Conditional rendering based on role */}
            {user.role === 'admin' && (
              <div>
                <h2 style={{ color: "red" }}>Admin Panel</h2>
                {/* Add admin functionalities here */}
              </div>
            )}
            {user.role === 'member' && (
              <div>
                <h2 style={{ color: "red" }}>member Panel</h2>
                {/* Add admin functionalities here */}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
};

export default Home;

