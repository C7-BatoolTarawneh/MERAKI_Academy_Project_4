import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";


import "./Style.css";
import { borderRadius } from "@mui/system";

const Navbar = () => {
    
  const drawerWidth = 210;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
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
            <HomeIcon
              className="home-icon-left-nav"
              color="black"
              sx={{ fontSize: 40 }}
            />
            <ListItemText>
              <Link to="/Home"> Home </Link>
            </ListItemText>
          </ListItem>
        </List>

        <List>
          <ListItem>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              borderRadius={100}
            >
              Tweet
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
