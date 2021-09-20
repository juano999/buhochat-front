import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {useState, useEffect} from 'react'; 
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
    position:"absolute",
    bottom: "0", 
    width: "100%",
    padding: "20px",
  },
  container: {
    width: "100%",
    position: "relative",
  },
  buttonStyle: {
    width: "100%",
  },
}));

const ChatList = () => {
  const classes = useStyles();
  const router = useRouter();
  const [ data, setData ] = useSWR("/users/random", fetcher);
  const [users, setUsers] = useState([]);

  const [nextUser, setNextUser] = useState(0);
  useEffect(()=>{
    
  }, [data]);
  
  const handleActivity = () => {
    setData((prevState) => {
      const newUser = useSWR("/users/random", fetcher);
      console.log(newUser);
      return [...prevState, newUser];
    })
    /*
    if(nextUser < data.length){
      setUsers([...users, data[nextUser]]);
      setNextUser(nextUser+1);
    }*/
  };


  return (
    <div className={classes.container}>
      {data.map((user) => (
        <div key={user.id}>
         <Grid item xs={12} className={classes.contactsPosition}>
        <PersonIcon fontSize="large"></PersonIcon> {user.nickName}
      </Grid>
      <Divider className={classes.divider} /> 
        </div>
      ))}
      
      <Grid item xs={12} className={classes.newContact}>
      <Button color="primary"
      className={classes.buttonStyle}
      variant='contained'
      onClick={handleActivity}

        Nuevo usuario
      </Button>
      </Grid>
    </div>
  );
};

export default ChatList;
