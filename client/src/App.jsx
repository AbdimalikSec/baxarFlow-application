import "./App.css";
import { Route, Navigate, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Write from "./components/Write";
import { useState, useEffect, useContext } from "react";
import About from "./components/About";
import Choose from "./components/Choose";
import Members from "./components/Members";
import { InputProvider } from "./context/context";
import { InputContext } from "./context/context";
import Profile from "./components/Profile";
import JoinGroup from "./components/joinGroup"; // Import JoinGroup
import { auth } from './firebase'; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import ClassRome from "./components/ClassRome";
import ClassDetail from "./components/classDetails";
import Spinner from "./components/spinner";
import UserProfile from "./components/UserProfile";

function App() {
  const { user, setUser, loadingUser,setLoadingUser } = useContext(InputContext); // Make sure loadingUser is exposed

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingUser(false); // ✅ <-- Add this here, outside the if-else
    });
    return () => unsubscribe();
  }, [setUser]);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner/>
      </div>
    );
  }
  return (
    <>
      <div>
        <Header user={user} />
        <Routes>
          <Route path="/" element={user ? <Home /> : <JoinGroup />} /> {/* Default route */}
          <Route path="/choose" element={<Choose />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <JoinGroup />} />
          <Route path="/write" element={!user ? <Navigate to="/signup" /> : <Write />} />
          <Route path="/about" element={<About />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="Classroom" element={<ClassRome/>} />
          <Route path="/userProfile" element={<UserProfile/>} />
          <Route path="/Classroom/:slug" element={<ClassDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;