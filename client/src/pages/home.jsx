import React, { useContext } from "react";
import Articles from "../components/articles";
import Sidebar from "../components/Homesidebar";
import Footer from "../components/footer";
import Write from "../components/Write";
import { InputContext } from "../context/context";
import ChooseCategory from "../components/Choose";
import Spinner from "../components/spinner";

const Home = () => {
  const { user, loadingUser } = useContext(InputContext);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

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
            {user.role === "admin" && (
              <div>
                <h2 style={{ color: "red" }}>Admin Panel</h2>
              </div>
            )}
            {user.role === "member" && (
              <div>
                <h2 style={{ color: "red" }}>member Panel</h2>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
