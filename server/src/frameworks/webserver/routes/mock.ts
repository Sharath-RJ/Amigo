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
        const prompt = `In your role as a language learning coach for a social media 
                       application focused on improving English speaking skills, your 
                       task is to create a mock test aimed at assessing the user's
                       proficiency level. This test will consist of 15 questions with 4
                       answer options each, of which one will be correct. The user's responses 
                       will help gauge their English language proficiency.Now, let's get started 
                       with creating the questions for the mock test in this format:[{
                         "question_number": 1,

                          "question": "",

                           "options": ["", "", "", ""],

                          "correct_answer": ""}]`
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log(text)
        res.json(JSON.parse(text))
    
    })

    return router
}
