import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";

import ListItemText from "@mui/material/ListItemText";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import "./Style.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

const Navbar = () => {
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  // const drawerWidth = 260;

  return (
    <div className="left-container">
    <div className="left">
      <List>
        <ListItem>
          <TwitterIcon
            className="twitter-icon-left-nav"
            color="primary"
            sx={{ fontSize: 80 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <HomeTwoToneIcon
            className="home-icon-left-nav"
            color="primary"
            sx={{ fontSize: 60 }}
          />
          <ListItemText>
            <Link
              underline="none"
              style={{ textDecoration: "none" }}
              to="/Home"
            >
              {" "}
              {<p>Home</p>}{" "}
            </Link>
          </ListItemText>
        </ListItem>
      </List>

      {/*//////////  */}
      <List>
        <ListItem>
          <AccountCircleTwoToneIcon
            className="home-icon-left-nav"
            color="primary"
            sx={{ fontSize: 60 }}
          />
          <ListItemText>
            <Link
              underline="none"
              style={{ textDecoration: "none" }}
              to="/profile"
            >
              {<p>Profile</p>}
            </Link>
          </ListItemText>
        </ListItem>
      </List>

      {/* //////////////// */}
      <List>
        <ListItem>
          <PeopleAltTwoToneIcon
            className="home-icon-left-nav"
            color="primary"
            sx={{ fontSize: 60 }}
          />
          <ListItemText>
            <Link
              underline="none"
              style={{ textDecoration: "none" }}
              to="/yourlist"
            >
              {<p>Follower/Following List</p>}
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      {/* ************************** */}
      <List>
        <ListItem>
          <SettingsTwoToneIcon
            className="home-icon-left-nav"
            color="primary"
            sx={{ fontSize: 60 }}
          />
          <ListItemText>
            <Link
              underline="none"
              style={{ textDecoration: "none" }}
              to="/settings"
            >
              {<p>Settings</p>}
            </Link>
          </ListItemText>
        </ListItem>
      </List>

      {/* //////////////// */}
      <List>
        <ListItem>
          <LogoutTwoToneIcon
            className="home-icon-left-nav"
            color="primary"
            sx={{ fontSize: 60 }}
          />
          <ListItemText>
            <Link
              underline="none"
              style={{ textDecoration: "none" }}
              to="/login"
              onClick={() => handleLogin("")}
            >
              {<p>Log Out</p>}
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      {/* ////////// */}
    </div>
    </div>
  );
};

export default Navbar;
