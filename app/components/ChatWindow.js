import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import axiosInstance from "../api_call";
import DispatchContext from "../DispatchContext";
import Page from "./Page";

const ChatWindow = () => {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const { username } = useParams();
  const appDispatch = useContext(DispatchContext);

  // State to store chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Good Day!, Chat with your documents now!",
      sender: "DocChat",
    },
  ]);

  const handleUserMessage = async (userMessage) => {
    const newMessages = chatMessages.concat({
      message: userMessage,
      sender: "user",
      direction: "outgoing",
    });
    console.log("concat", newMessages);
    // const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(newMessages);
    setIsChatbotTyping(true);
    processUserMessage(userMessage, newMessages);
  };
  function processUserMessage(userMessage, newMessages) {
    axiosInstance
      .post(
        "/bot/query/",
        { bot_username: username, query: userMessage },
        { appDispatch }
      )
      .then((response) => {
        console.log("gpt response chat messages", chatMessages);
        setChatMessages([
          ...newMessages,
          {
            message: response.data.data.answer,
            sender: "DocChat",
          },
        ]);

        setIsChatbotTyping(false);
      });
  }

  return (
    <Page title="Chat">
      {console.log("total messages", chatMessages)}
      <div style={{ position: "relative", height: "100vh", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            {/* Display chat messages and typing indicator */}
            <MessageList
              typingIndicator={
                isChatbotTyping ? (
                  <TypingIndicator content="DocChat is thinking" />
                ) : null
              }
            >
              {/* Map through chat messages and render each message */}
              {chatMessages.map((message, i) => {
                return (
                  <Message
                    key={i}
                    model={message}
                    style={
                      message.sender === "DocChat" ? { textAlign: "left" } : {}
                    }
                  />
                );
              })}
            </MessageList>
            {/* Input field for the user to type messages */}
            <MessageInput
              placeholder="Type Message here"
              onSend={handleUserMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </Page>
  );
};

export default ChatWindow;
