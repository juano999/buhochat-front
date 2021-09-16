
import axios from "axios";
import api from "src/api";
import React from "react";
import { useEffect, useState } from "react";



const ChatView = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState();



    useEffect(() => {
        //console.log("chatid", chatId)


        //chatsFetcher()


    }, [])
    useEffect(() => {
        //console.log("chatid", chatId)

        chats.map((chat) => {

        })



    }, [chats])

    async function messagesPopulation(id) {
        try {

            let messages = [];
            const res = await api.get(`/chat/${id}/messages`);
            console.log(res);
            messages = await res.data
            console.log("mensajes", res.data)
            setMessages(messages)
        } catch (e) {
            console.log(e)
        }

    }
    async function chatsFetcher() {
        try {

            let chats = [];
            const res = await api.get(`/chats`);
            console.log(res);
            chats = await res.data
            console.log("chats", res.data)
            setChats(chats);

        } catch (e) {
            console.log(e)
        }

    }


    if (!messages) {
        return "Cargando datos...";
    }
    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <div>
                        {message.text}

                    </div>
                    <div>
                        {message.updated_at}
                    </div>
                </div>
            ))}

        </div>
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





