import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [searchdata, setSearchdata] =useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);



/////////////////////////////////////////////////////////////////////////


useEffect(() => {
    const searchdata = JSON.parse(localStorage.getItem("searchdata"));
    setSearchdata(searchdata);
    console.log("test");
    console.log(localStorage.searchdata);
    console.log("test");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);


/////////////////////////////////////////////////////////////////////////






  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        searchdata,
        setSearchdata,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
