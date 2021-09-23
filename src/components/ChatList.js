import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api/index";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import { set } from "js-cookie";

const fetcher = (url) => api.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: "#FFFFFF",
    height: "2px",
  },
  contactsPosition: {
    textAlign: "left",
    height: "59px",
    color: "#FFFFFF",
  },
  newContact: {
    height: "auto",


    width: "100%",

  },
  list: {
    overflowY: "scroll",
    height: "77vh"
  },
  listItem: {

  },
  newUserBtn: {
    width: "100%",
    color: "black",
    backgroundColor: "#D2D4C4"
  },
}));

const ChatList = ({ onChangeUser }) => {
  const classes = useStyles();
  const router = useRouter();
  const [chatsUpdated, setChatsUpdated] = useState([]);
  const [chats, setChats] = useState([]);
  const [newRandom, setNewRandom] = useState(0);
  const [authUser, setAuthUser] = useState();
  const [userShowed, setUserShowed] = useState(null);


  useEffect(() => {

    chatsPopulation();
    console.log("chatsConNick", chats)


  }, [newRandom, onChangeUser]);

  useEffect(() => {
    getAuthenticatedUser();

  }, [])


  async function randomUser() {
    try {
      const res = await api.get(`/users/random`);
      console.log("newUser", res.data);
      const newUser = res.data
    } catch (e) {
      console.log(e)
    }
  }
  const handleNextUser = () => {
    randomUser();
    if (newRandom == 0) {
      setNewRandom(1);
    }
    if (newRandom == 1) {
      setNewRandom(0);
    }
  }
  async function chatsPopulation() {
    const res = await api.get("/chats");
    const chats = res.data;
    console.log("chats", res)
    setChats(chats);

  }

  async function getAuthenticatedUser() {
    try {
      const response = await User.getAuthenticatedUser();
      console.log("response user", response);
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
    <Grid container >
      <Grid spacing={0} md={12} className={classes.list}>
        {chats.map((chat) => (
          <Grid md={12} key={chat.id} >
            <Grid item xs={12} md={12} className={classes.contactsPosition} onClick={() => onChangeUser(chat)}>
              <PersonIcon fontSize="large"></PersonIcon>{chat.user_id_2}  {chat.lastMessage}

            </Grid>

          </Grid>
        ))}
      </Grid>

      <Button
        color="primary"
        className={classes.newUserBtn}
        variant="contained"
        onClick={handleNextUser}
      >
        Nuevo usuario
      </Button>

    </Grid>
  );
};

export default ChatList;