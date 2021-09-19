
import api from "src/api";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { mergeClasses } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import User from "../api/user";
import { set } from "js-cookie";

const schema = yup.object().shape({
    text: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        position: "relative"
    },
    userPreview: {
        display: "flex",
        width: "100%"

    },
    userPreview_icons: {
        float: "right",
    },
    messageSender: {
        bottom: "0",
        position: "absolute"
    },
    messagesFromMe: {
        textAlign: "right",
        color: "white",
        backgroundColor: "#8D2A27",
        width: "fit-content",
        float: "right",
        padding: "11px",
        margin: "10px",
        borderRadius: "11px",
        maxWidth: "80%",
    },
    messagesFromOther: {
        textAlign: "left",
        color: "black",
        backgroundColor: "#ADB3CF",
        width: "fit-content",
        float: "left",
        padding: "11px",
        margin: "10px",
        borderRadius: "11px",
        maxWidth: "80%",
    }
}));
const ChatView = ({ chat }) => {
    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const onSubmit = (formData) => setResult(JSON.stringify(formData));
    const [result, setResult] = useState("");
    const [userShowed, setUserShowed] = useState(null);
    const [authUser, setAuthUser] = useState();

    useEffect(() => {
        console.log("chatTOSHOW", chat);
        messagesPopulation(chat);
        if (chat) {

            getUserShowed();
        }


    }, [chat, result])

    useEffect(() => {
        getAuthenticatedUser()
        console.log("chat", chat)
    }, [])


    async function messagesPopulation(chat) {
        try {

            let messages = [];
            const res = await api.get(`/chat/${chat.id}/messages`);
            console.log(res);
            messages = await res.data
            console.log("mensajes", res.data)
            setMessages(messages)
        } catch (e) {
            console.log(e)
        }

    }

    const onFinishLog = async (formData) => {
        try {
            const messageData = {
                ...formData,
                chat_id: chat.id,
            };
            console.log(formData);
            const response = await api.post('/messages', messageData);
            console.log("response", response.data);


            setResult("Se envió un mensaje");

            reset();
            // router.push(Routes.HOME);
        } catch (e) {
            console.log("e", e.response);
            const { response } = e;
            setResult("An error has occurred");

            if (response) {
                if (response.data.errors) {
                    const errors = response.data.errors;
                    // const errorList = Object.values(errors);
                    const newErrorList = [];

                    for (let field in errors) {
                        newErrorList.push(...errors[field]);
                    }
                    console.log("errorList", newErrorList);


                }
            }
        }
    };

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

    async function getUserShowed() {
        let res = null;
        console.log("authuser", authUser);
        if (authUser.id === chat.user_id_1) {
            res = await api.get(`users/${chat.user_id_2}`);
        } else {
            res = await api.get(`users/${chat.user_id_1}`);

        }
        console.log("userShowed", res.data)
        setUserShowed(res.data);
    }

    if (!chat) {
        return "Seleccione a una persona con la que quiera Chatear o Presiona el Boton << Nuevo Usuario >> para Chatear con alguien aleatorio";
    }
    return (
        <Grid className={classes.container}>
            <Grid container className={classes.userPreview}>
                <Grid md={10}>{userShowed ?
                    <label>
                        {userShowed.nickName}
                    </label> : <label></label>}</Grid>
                <Grid md={2} className={classes.userPreview_icons}>
                    <PersonAddIcon fontSize="large"></PersonAddIcon>
                    <MoreVertIcon fontSize="large"></MoreVertIcon>
                </Grid>
            </Grid>
            <Grid container>
                {messages.map((message) => (
                    <Grid md={12} key={message.id} >
                        <Box className={message.user_id === authUser.id ? classes.messagesFromMe : classes.messagesFromOther}>

                            <div>
                                {message.text}
                            </div>
                            <div>
                                {message.updated_at}
                            </div>
                        </Box>
                    </Grid>
                ))}

            </Grid>
            <form onSubmit={handleSubmit(onFinishLog)}>
                <Grid container className={classes.messageSender}>

                    <Grid md={10}>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className={classes.colortextfield}
                                    label="text"
                                    variant="filled"
                                    type="text"
                                />
                            )}
                        //size="small"
                        />

                    </Grid>
                    <Grid md={2}>

                        <AttachFileIcon></AttachFileIcon>
                        <Button type="submit" variant="contained">

                            <SendIcon fontSize="large"></SendIcon>
                        </Button>
                    </Grid>
                </Grid>
            </form>



        </Grid>
    );
}
export default ChatView;

// export async function getStaticProps(context) {
//     try {
//         let messages = [];
//         const res = await fetch(`http://localhost:8000/api/chat/3/messages`, {   // se obtiene los mensajes del chat con id 3
//             headers: {
//                 Authorization:
//                     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTA1NDQ4NCwiZXhwIjoxNjMxMDU4MDg0LCJuYmYiOjE2MzEwNTQ0ODQsImp0aSI6IkZ2Zk1DUUlMNXI3dmR6aE0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.hOLGPVAMK8u1xDbKBPmVkqnDfFBw3HSNSMUHLZsYj84",
//             },
//         });

//         messages = await res.json()
//         console.log("mensajes", messages)
//     } catch (e) {
//         console.log(e);
//     }




//     return {
//         props: {
//             messages,
//         },
//     }
// }





