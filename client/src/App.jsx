import "./App.css";
import { Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/signin";
import Home from "./pages/home";
import Write from "./components/Write";
import { useState, useEffect } from "react";
import Singlearticle from "./components/Singlearticle";
import About from "./components/About";
import Choose from "./components/Choose";
import UserChooses from "./components/UserChooses";
import { InputProvider } from "./context/context";

function App() {

  //error 403
  /* 
  equest details: response_type=code redirect_uri=http://localhost:5000/auth/google/callback client_id=1008204425496-iu0nv845q7uvt65f6ufo7714leqct6ld.apps.googleusercontent.com access_type=online scope=https://www.googleapis.com/auth/userinfo.profile
  
  */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          console.log(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  //hdu user jiro book so bandhig
  //hdu user jiro home ka joog
  return (
    <>
      <div>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <Login />} >
            <Route index element={<Choose />} 
            />
          </Route>
          <Route
            path="/write"
            element={user ? <Write /> : <Navigate to="/signin" />}
            />
          <Route path="/article/:id" element={<Singlearticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/userchooses" element={<UserChooses />} />
        </Routes>
      </div>
    </>
  );
}

export default App;




