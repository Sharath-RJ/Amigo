import express, { Router } from "express"
import openai from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"
import test from "node:test"

export default function mockRouter(): Router {
    const router = express.Router()

    router.get("/getQuestions", async (req, res) => {
        const genAi = new GoogleGenerativeAI(
            "AIzaSyBefG5HOkZDaNK5VoiArhqjPoQqDhbf2JQ"
        )
        const model = genAi.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `Create a mock test consisting of 15 questions for assessing English language proficiency. Each question should have a question number, a question, four answer options, and the correct answer. The questions should start very easy and gradually increase in difficulty: the first 5 questions should be at a beginner level, the next 5 questions at an intermediate level, and the final 5 questions at an advanced level. Use the following format for each question:

[
  {
    "question_number": 1,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  },
  {
    "question_number": 2,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  },
  ...
  {
    "question_number": 15,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  }
]

`
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log(text)
        res.json(JSON.parse(text))
    
    })

    return router
}
