import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import ChatList from "@/components/ChatList";
import ChatView from "@/components/ChatView";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "550px",
  },
  divider: {
    backgroundColor: "#FFFFFF",
    height: "2px",
  },
  colorAll: {
    backgroundColor: "#D2D4C4",
    height: "40px"
  },
  colorFriends: {
    backgroundColor: "#2058AE",
    color: "#FFFFFF",
    height: "40px"
  },
  contacts: {
    backgroundColor: "#2058AE",
    height: "470px",
  },
  contactsPosition: {
    textAlign: "left",
    height: "59px",
    color: "#FFFFFF",
  },
  newContact: {
    backgroundColor: "#D2D4C4",
    height: "59px",
  },

  messageSpace: {
    backgroundColor: "#9CB8E2",
    height: "89vh",
  },
  friendProfile: {
    textAlign: "left",
    color: "#000000",
    height: "70px",
  },
  addFriend: {
    textAlign: "right",
    color: "#000000",
    height: "70px",
  },
  messages: {
    backgroundColor: "#9CB8E2",
    height: "370px",
  },
  sendMessages: {
    backgroundColor: "#9CB8E2",
    height: "90px",
  },

  colorText: {
    backgroundColor: "#FFFFFF",
    width: "700px",
  },
  divider2: {
    backgroundColor: "#9CB8E2",
    height: "5px",
  },
  sendMultimedia: {
    backgroundColor: "#9CB8E2",
    color: "#90240E",
    textAlign: "left",
  },
  divider3: {
    backgroundColor: "#9CB8E2",
    height: "10px",
  },

  list: {
    borderTop: "1px solid white",
    width: "100%",
  },
  selectChatBox: {
    backgroundColor: "#2058AE",
    height: "86vh",

  }

}));

export default function ChatBody() {
  const classes = useStyles();
  const [chatToShow, setChatToShow] = useState(null);

  // handleChangeUser
  // setUserToShow(idUser)
  const handleChangeUser = (chat) => {

    setChatToShow(chat)
  }
  return (


    <Grid container spacing={0} className={classes.root}>
      <Grid container item xs={2} md={4} className={classes.selectChatBox}>
        <Grid item xs={6} md={6} className={classes.colorAll}>
          <Button>Todos </Button>
        </Grid>
        <Grid item xs={6} md={6} className={classes.colorFriends}>
          <Button>Amigos </Button>
        </Grid>
        <Divider className={classes.divider} />

        <Grid item xs={12} container spacing={0} className={classes.list}>
          <ChatList onChangeUser={handleChangeUser} />
        </Grid>

      </Grid>


      <Grid container spacing={0} md={8} className={classes.messageSpace}>
        <ChatView chat={chatToShow} />
      </Grid>


    </Grid>

  );
}
