<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const {
  generatePrompt,
  generateExamplePrompts,
  exampleQA,
  systemPrompt,
} = require("./src/pages/api/promptGenerator");
<<<<<<< HEAD
=======
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
<<<<<<< HEAD
>>>>>>> e4514af (Added Chat API integration, updated packages, tested local setup, and added server.js to root directory)
=======
const path = require('path');
const { generatePrompt, exampleQA } = require('./src/pages/api/promptGenerator');
>>>>>>> a20bb59 (Modified chatbot wiith Questions, will fix color scheme for site later. If needed can add prepopulated questions as drop down options as opposed to the way it is now)
=======
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

<<<<<<< HEAD
<<<<<<< HEAD
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Check if the message matches any predefined questions
  const predefinedAnswer = exampleQA.find(
    (qa) => qa.question.toLowerCase() === message.toLowerCase(),
  );

  if (predefinedAnswer) {
    // If a match is found, respond with the predefined answer
    res.json({ text: predefinedAnswer.answer });
    return;
  }

  // If no match is found, proceed with the OpenAI API call
  const prompt = generatePrompt(message);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: prompt,
=======
app.post('/api/chat', async (req, res) => {
=======
app.post("/api/chat", async (req, res) => {
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)
  const { message } = req.body;

  // Check if the message matches any predefined questions
  const predefinedAnswer = exampleQA.find(
    (qa) => qa.question.toLowerCase() === message.toLowerCase(),
  );

  if (predefinedAnswer) {
    // If a match is found, respond with the predefined answer
    res.json({ text: predefinedAnswer.answer });
    return;
  }

  // If no match is found, proceed with the OpenAI API call
  const prompt = generatePrompt(message);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
<<<<<<< HEAD
        model: 'gpt-4',
<<<<<<< HEAD
        messages: [{ role: 'user', content: message }],
>>>>>>> e4514af (Added Chat API integration, updated packages, tested local setup, and added server.js to root directory)
=======
=======
        model: "gpt-4",
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)
        messages: prompt,
>>>>>>> a20bb59 (Modified chatbot wiith Questions, will fix color scheme for site later. If needed can add prepopulated questions as drop down options as opposed to the way it is now)
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
<<<<<<< HEAD
<<<<<<< HEAD
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
=======
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
>>>>>>> e4514af (Added Chat API integration, updated packages, tested local setup, and added server.js to root directory)
=======
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)
    );

    const text = response.data.choices[0].message.content.trim();
    res.json({ text });
  } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with OpenAI");
=======
    console.error('Error communicating with OpenAI:', error);
    res.status(500).send('Error communicating with OpenAI');
>>>>>>> e4514af (Added Chat API integration, updated packages, tested local setup, and added server.js to root directory)
=======
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with OpenAI");
>>>>>>> 53bf2e0 (Added features to chatbot including speaking within context about PayBridge application when answering questions, FAQ: section for range of questions, updated UI for readability)
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
