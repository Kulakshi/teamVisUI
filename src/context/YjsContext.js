import React, {createContext, useContext, useEffect} from "react";
import * as Y from "yjs";
import {WebsocketProvider} from "y-websocket";

const YjsContext = createContext();

export const useYjs = () => {
    return useContext(YjsContext);
};

export const YjsProvider = ({children}) => {
    const doc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
        "ws://localhost:1234",
        "my-roomname",
        doc
    );

    setInterval(() => {
      if (!wsProvider.wsconnected) {
          wsProvider.connect()
      }
    }, 5000);

    const activeUsers = new Set()
    wsProvider.awareness.on('change', changes => {
        const users = wsProvider.awareness.getStates()
        users.forEach((item) => {
                console.log("!=",item.value)
                if (item.value) {
                    activeUsers.add(item.value?.userId)
                }
            })

      console.log('activeUsers:', ...activeUsers);
    });

    const setUerOnline = (userId) =>{
        if(userId){
            wsProvider.awareness.setLocalState({
                userId: userId
            });
        }
    }

    wsProvider.on("status", (event) => {
        console.log(event.status); // logs "connected" or "disconnected"
    });

    doc.on('update', (update) => {
        console.log('Received update:');
        Y.applyUpdate(doc, update);
        console.log('Updated:');
    });

    doc.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    const ychartsmap = doc.getMap("charts");
    useEffect(() => {
        return () => {
            // Clean up resources if needed
            wsProvider.disconnect();
        };
    }, []);

    return (
        <YjsContext.Provider value={{doc, ychartsmap, setUerOnline}}>
            {children}
        </YjsContext.Provider>
    );
};
