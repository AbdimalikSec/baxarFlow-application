import "./App.css";
import { Route, Navigate} from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/signin";
import Home from "./pages/home";
import Write from "./components/Write";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Singlearticle from "./components/Singlearticle";
import About from "./components/About";
import Choose from "./components/Choose";
import UserChooses from "./components/UserChooses";
import { InputProvider } from "./context/context";
import ReadList from "./components/ReadList";
import EachCategory from "./components/EachCategory";

function App() {
  const router = useNavigate()
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
  
 /*  if(user){
    router('/choose')
  } */

  return (
    <>
      <div>
        <Header user={user} />
        <Routes>
          <Route path="/" user={user} element={<Home />} />
          <Route
            path="/signin"
            element={user ? <Navigate to="/choose" /> : <Login />}
          >
            <Route index element={<Choose />} />
          </Route>

          <Route
            path="/write"
            element={!user ? <Write /> : <Navigate to="/signin" />}
          />
          <Route path="/article/:id" element={<Singlearticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/choose" element={<Choose />} />
          <Route user={user} path="/userchooses" element={<UserChooses />} />
          <Route user={user} path="/readlist" element={<ReadList />} />
          <Route path="/eachCategory" element={<EachCategory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
