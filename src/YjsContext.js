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

    wsProvider.on("status", (event) => {
        console.log(event.status); // logs "connected" or "disconnected"
    });

    doc.on('update', (update) => {
        // console.log('Received update:', update);
        Y.applyUpdate(doc, update);
        // console.log("UPDATED!!!");
    });

    doc.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    const yarray = doc.getArray("my-array");
    const ychartsmap = doc.getMap("charts");
    console.log(yarray)
    console.log("123", ychartsmap)
    useEffect(() => {
        return () => {
            // Clean up resources if needed
            wsProvider.disconnect();
        };
    }, []);

    return (
        <YjsContext.Provider value={{doc, yarray, ychartsmap}}>
            {children}
        </YjsContext.Provider>
    );
};
