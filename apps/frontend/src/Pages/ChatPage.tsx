import React, { useState } from "react";
import OpenAI from "openai";
import SideBar from "../components/SideBar.tsx";
import swoosh from "../assets/swoosh.png";
import { Box } from "@mui/material";

const key = "sk-proj-H1B2AWuEHfy5KYin2MX8T3BlbkFJXQF5bhzAGW9XXUudoRtj";
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true, // Replace with your actual API key for testing
});

const ChatPage = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
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
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setResponse(response.choices[0].message.content ?? "");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box display="flex">
      <SideBar />
      <div
        className="overflow-y-auto h-screen flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${swoosh})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div>
          <div>
            <label htmlFor="userInput">Enter your message:</label>
            <input
              type="text"
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div>{response}</div>
        </div>
      </div>
    </Box>
  );
};

export default ChatPage;
