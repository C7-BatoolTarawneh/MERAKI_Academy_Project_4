import React, { useState,useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Typography from '@mui/joy/Typography';
import axios from "axios";
import "./Style.css";

const RightNavbar = () => {
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  

 
  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:5000/users/search_1?userName=${userName}`);
      setUser(response.data.user);
      setError('');
    } catch (err) {
      setUser(null);
      setError(err.response.data.message);
    }
  };

  
 

  return (
    <div className="right">
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <input className="search-input" type="text" placeholder="Search..." value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button className="search-button" type="submit">Search</button>
      </div>
    </form>

    {error && <p>{error}</p>}

    {user && (
      <div className="user-card">
        <div className="user-image">
          <img className="pr-im" src={user.profilePicture} alt="Profile" />
        </div>
        <div className="user-info">
          <Typography variant="h6">{`@${user.userName}`}</Typography>
          {/* add more fields as needed */}
        </div>
      </div>
    )}
    <div className="trends">
      <h1 className="nav">Trends for you</h1>
      <div className="the-trends">
      <h2>#Jordan</h2>
      <h2>#Women_International_Day</h2>
      <h2>#Down_Town</h2>
      <h2>#Ramdan</h2>
      <h2>#رمضان_كريم</h2>
      <h2>#المسجد_الأقصى</h2>
      <h2>#Zain</h2>
      
      </div>
    </div>
  </div>
  );
};

export default RightNavbar;
