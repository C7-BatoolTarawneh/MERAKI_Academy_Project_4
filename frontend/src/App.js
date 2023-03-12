import "./App.css";
import { Routes, Route, useParams, Link, useNavigate,useHistory} from "react-router-dom"
import React , {useState,useEffect,createContext,useContext,} from "react"
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LeftNavbar from "./components/LeftNavbar";
import TweetCard from "./components/TweetCard";
import LikeButton from "./components/LikeButton";

export const UserContext = createContext()
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token , setToken] = useState("")
  const navigate = useNavigate()

  const handleLogin = (newToken) =>{
  setToken(newToken)
  setIsLoggedIn(true)
  localStorage.setItem("token", newToken)
  navigate("Home")
  }
  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false)

    localStorage.removeItem("token")
    navigate("Login")
   
  };

  useEffect(() =>{
    setToken(localStorage.getItem("token"))
    if (token){
      handleLogin(token)
    }
    else if (!isLoggedIn)
    { 
      navigate("/login")
    }
  },[token])

  return (
    <UserContext.Provider value={{isLoggedIn,token,handleLogin,handleLogout}}>
    <div className="App">
   
      <Routes>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/Home" element={<Home/>}  />
        </Routes>
       
    </div>
    </UserContext.Provider> 
  );
}

export default App;
