import React, { createContext, useContext, useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const YjsContext = createContext();

export const useYjs = () => {
  return useContext(YjsContext);
};

export const YjsProvider = ({ children }) => {
  const doc = new Y.Doc();
  const wsProvider = new WebsocketProvider(
    "ws://localhost:3001",
    "my-roomname",
    doc
  );

  wsProvider.on("status", (event) => {
    console.log(event.status); // logs "connected" or "disconnected"
  });

  const yarray = doc.getArray("my-array");
  console.log(yarray)

  useEffect(() => {
    return () => {
      // Clean up resources if needed
      wsProvider.disconnect();
    };
  }, []);

  return (
    <YjsContext.Provider value={{ doc, yarray }}>
      {children}
    </YjsContext.Provider>
  );
};
