import React, { useState, useEffect, useContext } from "react";
import LeftNavbar from "../LeftNavbar";
import axios from "axios";
import { UserContext } from "../../App";
import RightNavbar from "../RightNavbar";
import Button from "@mui/joy/Button"; 

import "./style.css";

const Settings = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { isLoggedIn, token, user } = useContext(UserContext);
  const [imagee, setImagee] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", imagee);
    data.append("upload_preset", "a1dhlskc");
    data.append("cloud_name", "dnpshl3op");

    try {
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/dnpshl3op/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const json = await resp.json();
      // setUrl(json.url); // update the url state here
      // handleEditTweetSubmit(json.url); // where i edit the image
      console.log("json: ", json);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditEmail = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/email",
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPassword = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/password",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    if (newEmail !== "") {
      handleEditEmail();
    }
    if (newPassword !== "") {
      handleEditPassword();
    }
  };

  return (
    <div className="setting-container">
      <LeftNavbar />
      <div class="center-container">
        <h1 class="text-primary">Edit Profile</h1>
        <form class="form-horizontal" role="form">
          {/* <!-- left column --> */}
          <div class="col-md-3">
            <div class="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                class="avatar-img-circle-img-thumbnail"
                alt="avatar"
              />
              <div className="title">
                <h2>Update a Profile Picture</h2>
                <input type="file" class="form-control" />
              </div>
            </div>
          </div>
          
          {/* FOR COVER */}
          <div class="col-md-3">
            <div class="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                class="avatar-img-circle-img-thumbnail"
                alt="avatar"
              />
              <div className="title">
                <h2>Update a Cover Picture</h2>
                <input type="file" class="form-control" />
              </div>
            </div>
          </div>
          {/* <!-- edit form column --> */}
<br/>
          <div class="col-md-9-personal-info">
            <div className="title">
              <h1>Credentials</h1>
            </div>

            <div class="col-lg-8">
              <label class="col-lg-3-control-label">Update your email: </label>
              <input
                className="form-control"
                type="text"
                placeholder="update your Email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </div>

            <div class="form-group">
              
              <div class="col-lg-8">
              <label class="col-lg-3-control-label">Update your password: </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-offset-3-col-lg-8">
                <Button
                mtarginTop = "2vh"
                  type="submit"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
