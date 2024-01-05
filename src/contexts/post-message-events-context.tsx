import { createContext, useContext, useEffect, useState } from "react";

const initalContext: {
  messagePosted: boolean;
  setMessagePosted: (messagePosted: boolean) => void;
} = {
  messagePosted: false,
  setMessagePosted: (messagePosted: boolean) => {},
};

export const MessagePostedContext = createContext(initalContext);

export function MessagePostedProvider({ children }) {
  const [messagePosted, setMessagePosted] = useState(false);

  return (
    <MessagePostedContext.Provider value={{ messagePosted, setMessagePosted }}>
      {children}
    </MessagePostedContext.Provider>
  );
}

export const useMessagePostedContext = () => useContext(MessagePostedContext);
