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

//const fetcher = (url) => api.get(url).then((res) => res.data);

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

const ChatListFriends = ({ onChangeUser }) => {
    const classes = useStyles();
    //const router = useRouter();
    //const [users, setUsers] = useState([]);
    //const [chats, setChats] = useState([]);
    //const [newRandom, setNewRandom] = useState(0);

    const [friends, setFriends] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const res = await api.get("/chats")
            console.log('Respuesta amigos:', res.data)
            //const chats = res.data;
            setFriends(res.data);
        };

        getData();
    },[]);

    //useEffect(() => {

    //chatsPopulation();
    //}, [newRandom]);

    //async function randomUser() {
    //try {
    //const res = await api.get(`/users/random`);
    //console.log(res);
    //const newUser = res.data
    //} catch (e) {
    //console.log(e)
    //}
    //}
    //const handleNextUser = () => {
    //randomUser();
    //if (newRandom == 0) {
    //setNewRandom(1);
    //}
    //if (newRandom == 1) {
    //setNewRandom(0);
    //}
    //}
    //async function chatsPopulation() {
    //const res = await api.get("/chats")
    //console.log(res.data)
    //const chats = res.data;
    //setChats(res.data);

    // }

    if(!friends) {
        return "Cargando amigos..."
    }

    return (
        <Grid container>
            <Grid  md={12}  spacing={0} className={classes.list}>
                {
                    friends.map((friend) => (
                        <Grid md={12} key={friend.id}>
                            <Grid xs={12} md={12} className={classes.contactsPosition}>
                            <PersonIcon fontSize="large"></PersonIcon>
                            {friend.id}
                            </Grid>
                        </Grid>
                    ))
                }

            </Grid>
            
        </Grid>
        //<Grid container >
        // <Grid spacing={0} md={12} className={classes.list}>
        // {chats.map((chat) => (
        // <Grid md={12} key={chat.id} >
        // <Grid item xs={12} md={12} className={classes.contactsPosition} onClick={() => onChangeUser(chat)}>
        // <PersonIcon fontSize="large"></PersonIcon> {chat.user_id_2}
        //</Grid>

        //</Grid>
        //))}
        //</Grid>

        //<Button
        //color="primary"
        //className={classes.newUserBtn}
        //variant="contained"
        //onClick={handleNextUser}
        //>
        //Nuevo usuario
        //</Button>

        //</Grid>
    );
};

export default ChatListFriends;
