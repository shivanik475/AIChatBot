import React, { useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [qna, setQna] = useState("Hi,");
  const [ans, setAns] = useState("How can i help you?");
  const [isLoading, setLoading] = useState(false);
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
  const API_KEY = "";

  const sendingData = {
    contents: [
      {
        parts: [{ text: `${input}` }],
      },
    ],
  };
  const handleInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
    //sendingData.contents[0].parts[0].text = input;
  };

  const getData = () => {
    setLoading(true);
    setAns("");
    setQna("");
    const response = axios
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        sendingData
      )
      .then((res) => {
        setQna(input);
        // console.log(res.data.candidates[0].content.parts[0].text);
        setAns(res.data.candidates[0].content.parts[0].text);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="data-container">
        <p className="qna">{qna}</p>
        {isLoading ? (
          <div className="loader">
            <HashLoader />
          </div>
        ) : (
          <p className="ans">{ans}</p>
        )}
      </div>

      <div className="input-container">
        <input
          placeholder="Ask question"
          onChange={handleInput}
          value={input}
        />
        <button onClick={getData}>Submit</button>
      </div>
    </div>
  );
};

export default Chatbot;
