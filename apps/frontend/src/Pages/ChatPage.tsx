import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import "../styles/ChatPage.css";
import SendIcon from "@mui/icons-material/Send";

const key = "sk-proj-OSW3y1qeycxUiOAwBxigT3BlbkFJoKyoP4loGhm83Fw7pVKv";
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

type Message = {
  role: string;
  content: string;
  isTemporary?: boolean;
};

const ChatPage = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    setMessages([
      ...messages,
      { role: "user", content: userInput },
      { role: "bot", content: "", isTemporary: true },
    ]);

    setUserInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const tempMessageIndex = newMessages.findIndex(
          (message) => message.isTemporary,
        );
        if (tempMessageIndex !== -1) {
          newMessages[tempMessageIndex] = {
            role: "bot",
            content: response.choices[0].message.content ?? "",
          };
        }
        return newMessages;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <h2
        style={{
          color: "#333",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "1.5em",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        Hello, I am Herald. I am a AI chatbot. Feel free to ask me anything in
        the box below. Please be aware I may provide incorrect information!
      </h2>
      <List style={{ overflow: "auto", flexGrow: 1, padding: "1rem" }}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            style={{
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItemText
                primary={message.content}
                className={message.isTemporary ? "loading" : ""}
                style={{
                  background: message.role === "user" ? "#0b93f6" : "#f3f3f3",
                  color: message.role === "user" ? "#ffffff" : "#000000",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  marginBottom: "10px",
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                  position: "relative",
                  clear: "both",
                  margin: "10px 20px",
                  display: "inline-block",
                }}
              />
            </motion.div>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <Box display="flex" padding="1rem" borderTop="1px solid #ddd">
        <TextField
          fullWidth
          variant="outlined"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          style={{
            marginLeft: "1rem",
            borderRadius: "10px",
            minWidth: "48px",
            height: "48px",
            padding: 0,
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
