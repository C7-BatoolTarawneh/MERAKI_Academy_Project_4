import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const role = "640493a04bc598bcd351f584";
  // now lets register
  const handleregister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          userName,
          age,
          password,
          email,
          role,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <div className="register-data-container">
          <input
            type="text"
            id="userName"
            value={userName}
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br/>
          <input
            type="text"
            id="userName"
            value={userName}
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />

        </div>
      </div>
    </div>
  );
};

export default Register;
