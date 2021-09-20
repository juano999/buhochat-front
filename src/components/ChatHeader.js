import Container from "@material-ui/core/Container";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import ruta1 from "../../public/images/logo.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Logout from "@/components/Logout";
import { useState } from "react";
import User from "../api/user";

const useStyles = makeStyles((theme) => ({
  selectOptions: {
    textAlign: "right",
  },
  textAlignformControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    borderRadius: "13px",
    width: "130px",
    height: "30px",
  },
  formControl: {
    textAlign: "right",
  },
  colorMenu: {
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  divider: {
    backgroundColor: "#052E5E",
    height: "15px",
  },
}));

export default function ChatHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    getAuthenticatedUser();
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  async function getAuthenticatedUser() {
    try {
      const response = await User.getAuthenticatedUser();
      console.log("response user in header", response);
      setAuthUser(response.data)
      return response;
    } catch (error) {

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  return (
    <div className={styles.header}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Image
              src={ruta1} // Route of the image file
              height={65} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Grid>
          <Grid item xs={6} className={classes.selectOptions}>
            <FormControl className={classes.formControl}>
              <Divider className={classes.divider} />
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.colorMenu}
              >
                {authUser ? authUser.nickName : ''}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Ver perfil</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Logout />
                </MenuItem>
              </Menu>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
