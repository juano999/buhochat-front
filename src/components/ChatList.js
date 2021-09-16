import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api/index";
import useSWR from "swr";

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
    position: "absolute",
    bottom: "0",
    width: "100%",

  },
  container: {
    width: "100%",
    position: "relative",
  },
  buttonStyle: {
    width: "100%",
    color: "black",
    backgroundColor: "#D2D4C4"
  },
}));

const ChatList = ({ onChangeUser }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data, error } = useSWR("/users/random", fetcher);
  const [users, setUsers] = useState([]);

  const [nextUser, setNextUser] = useState(0);
  useEffect(() => {
    console.log("userslist", users);
  }, [data]);

  async function randomUser() {
    try {


      const res = await api.get(`/users/random`);
      console.log(res);
      const newUser = res.data

      setUsers((prevState) => {
        console.log("usuario nuevo", newUser)
        return [...prevState, newUser]

      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleNextUser = () => {
    randomUser();
  }

  return (
    <div className={classes.container}>
      {users.map((user) => (
        <div key={user.id}>
          <Grid item xs={12} className={classes.contactsPosition} onClick={() => onChangeUser(user.id)}>
            <PersonIcon fontSize="large"></PersonIcon> {user.nickName}
          </Grid>
          <Divider className={classes.divider} />
        </div>
      ))}

      <Grid item xs={12} className={classes.newContact}>
        <Button
          color="primary"
          className={classes.buttonStyle}
          variant="contained"
          onClick={handleNextUser}
        >
          Nuevo usuario
        </Button>
      </Grid>
    </div>
  );
};

export default ChatList;
