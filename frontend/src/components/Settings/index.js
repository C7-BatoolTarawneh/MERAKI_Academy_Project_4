import React, { useState, useEffect, useContext } from "react";
import LeftNavbar from "../LeftNavbar";
import axios from "axios";
import { UserContext } from "../../App";
import RightNavbar from "../RightNavbar";
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
    <>
    <RightNavbar/>
      <LeftNavbar />
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">Edit Profile</h1>
        <form class="form-horizontal" role="form">
        <div class="row">
          {/* <!-- left column --> */}
          <div class="col-md-3">
            <div class="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                class="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a Profile Picture...</h6>

              <input type="file" class="form-control" />
            </div>
          </div>
          <hr />
          {/* FOR COVER */}
          <div class="col-md-3">
            <div class="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                class="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload Cover Picture...</h6>

              <input type="file" class="form-control" />
            </div>
          </div>
          {/* <!-- edit form column --> */}
          <hr />

          <div class="col-md-9 personal-info">
            <h3>Credentials</h3>

           
              <div class="form-group">
                <label class="col-lg-3 control-label">Edit your email:</label>
                <div class="col-lg-8">
                  <input  className="form-control"
                    type="text"
                    placeholder="Edit your Email"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)} />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">
                  Edit your password:
                </label>
                <div class="col-lg-8">
                  <input  className="form-control"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-offset-3 col-lg-8">
                  <button type="submit" class="btn btn-primary"  onClick={handleSaveChanges}>Save Changes</button>
                </div>
              </div>
            
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
