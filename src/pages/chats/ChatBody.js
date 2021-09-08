import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "550px",
  },
  divider: {
    backgroundColor: "#FFFFFF",
    height: "2px",
  },
  colorAll: {
    backgroundColor: "#D2D4C4",
  },
  colorFriends: {
    backgroundColor: "#2058AE",
    color: "#FFFFFF",
  },
contacts: {
  backgroundColor:"#2058AE",
  height: "470px",
  
},
contactsPosition: {
textAlign: 'left',
height: "59px",
color: "#FFFFFF",
},
newContact: {
  backgroundColor:"#D2D4C4",
  height: "59px",
},

messageSpace: {
  backgroundColor:"#9CB8E2",
  height: "70px",
},
friendProfile: {
  textAlign:"left",
  color: "#000000",
  height: "70px"
},
addFriend: {
  textAlign:"right",
  color: "#000000",
  height: "70px"
},
messages: {
  backgroundColor:"#9CB8E2",
  height: "370px",
},
sendMessages: {
  backgroundColor: "#9CB8E2",
  height: "90px",
},

colorText: {
backgroundColor: "#FFFFFF",
width: "700px"
},
divider2: {
  backgroundColor: "#9CB8E2",
  height: "5px",
},
sendMultimedia: {
  backgroundColor: "#9CB8E2",
  color:"#90240E",
  textAlign: "left",
},
divider3: {
  backgroundColor: "#9CB8E2",
  height: "10px",
},
Box: {
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '580px',
}


}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4} className={classes.Box}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={6} className={classes.colorAll}>
              <Button >Todos </Button>
              </Grid>
              <Grid item xs={6} className={classes.colorFriends}>
              <Button >Amigos </Button>
              </Grid>
              <Grid item xs={12} className={classes.contacts}>
              <Divider className={classes.divider} />
                <Grid container spacing={1}>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> Jorgew98
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon>Bernabeus 
                  </Grid>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> Juan432
                  </Grid>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> Maria342
                  </Grid>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> Lucyrt33
                  </Grid>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> vane8889
                  </Grid>
                  <Grid item xs={12} className={classes.contactsPosition} >
                  <PersonIcon  fontSize="large"></PersonIcon> Angeles7874
                  </Grid>
                  <Grid item xs={12} className={classes.newContact} >
                  <Button >Nuevo usuario </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Paper>
        </Grid>
        <Grid item xs={8} className={classes.Box}>
          <Paper className={classes.paper} >
            <Grid container spacing={1} className={classes.messageSpace}>
              <Grid  item xs={6} className={classes.friendProfile}>
              <Divider className={classes.divider3} />
              <PersonIcon  fontSize="large"></PersonIcon> Bernabeus
              </Grid>
              <Grid  item xs={6} className={classes.addFriend}>
              <Divider className={classes.divider3} />
                <PersonAddIcon fontSize="large"></PersonAddIcon>
                <MoreVertIcon fontSize="large"></MoreVertIcon>
              </Grid>
              <Grid item xs={12} className={classes.messages}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={10} className={classes.sendMessages} >
                
                <Divider className={classes.divider2} />
                <TextField
                  id="filled-uncontrolled"
                  label="Escribe un mensaje aquí"
                  variant="outlined"
                  className={classes.colorText}
                />
              </Grid>
              <Grid item xs={1} className={classes.sendMultimedia} >
              <Divider className={classes.divider3} />
                <AttachFileIcon fontSize="large"></AttachFileIcon>
              </Grid>
              <Grid item xs={1} className={classes.sendMultimedia} >
              <Divider className={classes.divider3} />
                <SendIcon fontSize="large"></SendIcon>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
    
  );
}