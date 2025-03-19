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



/* const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID
}; */

/* VITE_FIREBASE_API_KEY="AIzaSyDYD4D4sSgktt8skWNlVDPjL27IbOMFy7M",
VITE_FIREBASE_AUTH_DOMAIN="fashilhack.firebaseapp.com",
VITE_FIREBASE_PROJECT_ID="fashilhack",
VITE_FIREBASE_STORAGE_BUCKET="fashilhack.firebasestorage.app",
VITE_FIREBASE_MESSAGING_SENDER_ID="26946334493",
VITE_FIREBASE_APP_ID="1:26946334493:web:1f685d063661774bf6fbf4",
VITE_FIREBASE_MEASURE_ID="G-E6HGX30XGN" */