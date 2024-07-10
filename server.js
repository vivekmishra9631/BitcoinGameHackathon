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

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const text = response.data.choices[0].message.content.trim();
    res.json({ text });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with OpenAI");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
