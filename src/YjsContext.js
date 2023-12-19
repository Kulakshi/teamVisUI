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
    "ws://localhost:1234",
    "my-roomname",
    doc
  );

  wsProvider.on("status", (event) => {
    console.log(event.status); // logs "connected" or "disconnected"
  });

  wsProvider.on('update', (update) => {
  // Apply the received update to synchronize the document
  Y.applyUpdate(doc, update);

  // Observe that the changes have merged
  console.log("UPDATED",doc.toJSON());
});

  const yarray = doc.getArray("my-array");
  const ychartsmap = doc.getMap("charts");
  console.log(yarray)
  console.log("123",ychartsmap)
  useEffect(() => {
    return () => {
      // Clean up resources if needed
      wsProvider.disconnect();
    };
  }, []);

  return (
    <YjsContext.Provider value={{ doc, yarray, ychartsmap }}>
      {children}
    </YjsContext.Provider>
  );
};
