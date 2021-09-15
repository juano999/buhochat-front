import React from "react";
import ChatView from "@/components/ChatView";
import { Chat } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";


const TestPage = () => {
    const [chatId, setChatId] = useState();

    const handleChangeId = () => {
        //solo para prueba
        setChatId(3);
    }
    const handleChangeId2 = () => {
        //solo para prueba
        setChatId(7);
    }


    return (
        <div>
            <div>
                <Button variant="contained" color="primary" onClick={handleChangeId}>
                    Primary
                </Button>
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={handleChangeId2}>
                    Secondary
                </Button>

            </div>
            {chatId ?
                <div>
                    <ChatView chatId={chatId}></ChatView>
                </div>

                : <div>cargando</div>}


        </div>
    );
}

export default TestPage;