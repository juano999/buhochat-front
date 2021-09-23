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
import useSWR from "swr";
import { FormatAlignJustify } from "@material-ui/icons";
import { styled } from '@material-ui/core/styles';


const schema = yup.object().shape({
    text: yup.string().required(),
});

const Input = styled('input')({
    display: 'none',
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
        border: "solid 2px"
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
        border: "solid 2px"
    },
    containerInformation: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    textInformation: {
        textAlign: "center",
    },
    colortextfield: {
        width: "730px",
    },
    nicknameStyles: {
        paddingLeft: "10px",
    },
    userPreview_icons: {
        textAlign: "right",
        paddingRight: "10px",
        paddingTop: "5px",
    },
    stylesMessage: {
        fontSize: "0.6em",
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
    const [result, setResult] = useState(null);
    const [userShowed, setUserShowed] = useState(null);
    const [authUser, setAuthUser] = useState();
    const { data, error } = useSWR(
        chat ? `/chat/${chat.id}/messages` : null,
        messagesPopulation,
        { refreshInterval: 2000 }
    );

    useEffect(() => {
        console.log("chatTOSHOW", chat);

        if (chat && !result) {

            getUserShowed();
        }
        //console.log("dataFromSWR", data)


    }, [chat, result])

    useEffect(() => {
        getAuthenticatedUser()

    }, [])




    async function messagesPopulation(url) {
        try {

            let messages = [];
            const res = await api.get(url);
            console.log(res);
            messages = await res.data

            //setMessages(messages)
            getUserShowed();
            return messages;
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
            console.log("Datos de mensaje", messageData);
            const response = await api.post('/messages', messageData);
            console.log("response", response.data);
            setResult("Se envió un mensaje");

            //update de lastmessage en chat
            const updateData = {
                lastMessage: formData.text,
            };
            const updateRes = await api.put(`/chats/${chat.id}`, updateData)
            console.log("response lastMessage", updateRes.data);

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
        try {
            let res = null;
            console.log("authuser", authUser);
            if (authUser.id === chat.user_id_1) {
                res = await api.get(`users/${chat.user_id_2}`);
            } else {
                res = await api.get(`users/${chat.user_id_1}`);

            }
            console.log("userShowed", res.data)
            setUserShowed(res.data);


        } catch (e) {
            console.log("error UserShowed", e)
        }
    }

    if (!chat || !data) {
        return <div className={classes.containerInformation}>
            <Grid xs={12} className={classes.textInformation}>
                <h2>Bienvenido a BuhoChat!</h2>
                <h2>Seleccione a una persona con la que quiera chatear o presiona el botón Nuevo Usuario para Chatear con alguien aleatorio</h2>
            </Grid>
        </div>
    }
    return (
        <Grid className={classes.container}>
            <Grid container className={classes.userPreview}>
                <Grid md={11} className={classes.nicknameStyles}>{userShowed ?
                    <div ><h3>
                        {userShowed.nickName}
                    </h3>
                    </div> : <label></label>}</Grid>
                <Grid md={1} className={classes.userPreview_icons}>
                    <Button type="submit" variant="outlined">
                        <PersonAddIcon></PersonAddIcon>
                    </Button>
                </Grid>
            </Grid>
            <Grid container>
                {data.map((message) => (
                    <Grid md={12} key={message.id} >
                        <Box className={message.user_id === authUser.id ? classes.messagesFromMe : classes.messagesFromOther}>

                            <div>
                                {message.text}
                            </div>
                            <div className={classes.stylesMessage}>
                                {message.created_at}
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
                                    label="Escriba un mensaje aquí"
                                    variant="filled"
                                    type="text"
                                />
                            )}
                        //size="small"
                        />

                    </Grid>
                    <Grid md={1}>
                        {/*<Button component="span" variant="upload">
                            <AttachFileIcon fontSize="large"></AttachFileIcon>
                            </Button>*/}
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                                <AttachFileIcon fontSize="large"></AttachFileIcon>
                            </Button>
                        </label>
                    </Grid>
                    <Grid md={1}>
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





