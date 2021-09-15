
import axios from "axios";
import api from "src/api";
import React from "react";
import { useEffect, useState } from "react";



const ChatView = () => {
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        //console.log("chatid", chatId)

        messagesPopulation();


    }, [])

    async function messagesPopulation() {
        try {
            let messages = [];
            const res = await fetch(`http://localhost:8000/api/chat/3/messages`, {   // se obtiene los mensajes del chat con id 3
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTEzOTE1MSwiZXhwIjoxNjMxMTQyNzUxLCJuYmYiOjE2MzExMzkxNTEsImp0aSI6Im5ZcUFPcFNDaTNBZkozZksiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.leVQ7uWZmxAi-ax0jfUhXQgqF04xmBcOtc4wwMLusNE",
                },
            });

            messages = await res.json()
            console.log("mensajes", messages)
            setMessages(messages)
        } catch (e) {
            console.log(e);
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





