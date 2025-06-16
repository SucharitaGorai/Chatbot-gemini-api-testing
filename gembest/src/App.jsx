//https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?

import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading your answer...\nIt might take up to 10 seconds");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Error generating answer. Please try again.");
      console.error(error);
    }
  }

  return (
    <div id="root">
      <h1>Chat Bot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Type your question here..."
      ></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>{answer}</p>
      <p>worked by sucharita</p>
    </div>
  );
}

export default App;
