import "./App.css";
import { Routes, Route, useParams, Link, useNavigate,useHistory} from "react-router-dom"
import React , {useState,useEffect,createContext,useContext,} from "react"
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LeftNavbar from "./components/LeftNavbar";
import TweetCard from "./components/TweetCard";
import LikeButton from "./components/LikeButton";
import Profile from "./components/Profile"
export const UserContext = createContext()
function App() {
  const [token , setToken] = useState(localStorage.getItem("token")||"" )
const [userId,setUserId] = useState(localStorage.getItem("userId")||"")
const [userName,setUserName] = useState(localStorage.getItem("userName")||"")

  const [isLoggedIn, setIsLoggedIn] = useState(token?true:false)
  const navigate = useNavigate()

  const handleLogin = (newToken,userId,userName) =>{
    // console.log(userId)
  setToken(newToken)
  setUserName(userName)
  setUserId(userId)
  setIsLoggedIn(true)
  localStorage.setItem("token", newToken)
  localStorage.setItem("username", userName)
  localStorage.setItem("userId", userId)

  navigate("Home")
  }

  const handleLogout = () => {
    setToken("");
    setUserName("")
    setUserId("")
    setIsLoggedIn(false)

    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    navigate("Login")
   
  };

  useEffect(() =>{
    // setToken(localStorage.getItem("token"))
    // if (token){
    //   handleLogin(token)
    // }
     if (!isLoggedIn)
    { 
      navigate("/login")
    }
  },[token])

  return (
    <UserContext.Provider value={{isLoggedIn,token,handleLogin,handleLogout,userId,userName}}>
    <div className="App">
   
      <Routes>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/Home" element={<Home/>}  />
     <Route path="/" element={<Home/>} />
     <Route path="/profile" element={<Profile/>} />
        </Routes>
       
    </div>
    </UserContext.Provider> 
  );
}

export default App;
