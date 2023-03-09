import "./App.css";
import { Routes, Route, useParams, Link, useNavigate} from "react-router-dom"
import React , {useState,useEffect,createContext,useContext} from "react"
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

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
    <UserContext.Provider value={{isLoggedIn,token,handleLogin}}>
    <div className="App">
   
      <Routes>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/Home" element={<Home/>} />
        </Routes>
       
    </div>
    </UserContext.Provider> 
  );
}

export default App;
