import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useParams } from "react-router";
import { getUserAPI } from "../../server/server";
import "./chat.scss";
import chat from "../../assets/chat.svg";

type Message = {
  user: string;
  message: string;
};

const Chat: React.FC = () => {
  const value = useParams();
  const userId = Number(value.id);
  const [user, setUser] = useState<string>("User");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const fetchedUser = await getUserAPI(userId);
      if (fetchedUser.name) setUser(fetchedUser.name);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7275/chathub") // Zmień URL na adres Twojego serwera
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages((messages) => [...messages, { user, message }]);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (!message) return;
    if (
      !isSending &&
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      setIsSending(true);
      try {
        await connection.send("SendMessage", user, message);
        setMessage("");
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <button
        className={`chat-toggle ${!isChatVisible ? "" : "chat-toggle--hide"}`}
        onClick={toggleChatVisibility}
      >
        <img src={chat} alt="chat" width="35px" />
      </button>
      {isChatVisible && (
        <div className="chat">
          <h1 className="chat__header">Czat</h1>
          <div className="chat__container">
            <div className="messages">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`message-container ${
                    m.user === user ? "my-message" : ""
                  }`}
                >
                  <div className="message">{`${m.user}: ${m.message}`}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat__container__send-section">
              <input
                className="message-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>Wyślij</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
