import express, { Router } from "express"
import openai from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"
import test from "node:test"
import authenticate from "../middlewares/authMiddleware"
import { isBlocked } from "../middlewares/checkBlockMiddleware"

export default function mockRouter(): Router {
    const router = express.Router()

    router.get("/getQuestions", authenticate, isBlocked, async (req, res) => {
        const genAi = new GoogleGenerativeAI(
            "AIzaSyBefG5HOkZDaNK5VoiArhqjPoQqDhbf2JQ"
        )
        const model = genAi.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `Create a mock test consisting of 15 questions and 4 options for each question, for assessing English language and grammar proficiency. Each question should have a question number, a question, four answer options, and the correct answer. The questions should start very easy and gradually increase in difficulty: the first 5 questions should be at a beginner level, the next 5 questions at an intermediate level, and the final 5 questions at an advanced level. Use the following format for each question note that it should be a valid JSON should not contain any special characters and unwantes strings at the begining and even the end of the following array. :

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

    router.post("/submitAnswers", authenticate, isBlocked, async (req, res) => {
        console.log("generating feedback")
        const { Questions, Answers, score } = req.body
        console.log(Questions)
        console.log(Answers)
        console.log("Score", score)
        const genAi = new GoogleGenerativeAI(
            "AIzaSyBefG5HOkZDaNK5VoiArhqjPoQqDhbf2JQ"
        )
        const model = genAi.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `
Please evaluate a user's English proficiency level based on their answers to a set of questions. Here are the details:

- Questions: ${Questions} (This is an array of objects, each containing a question and its correct answer)
- User's Answers: ${Answers}
- User's Score: ${score}

Tasks:
1. Verify that the user's answers match the correct answers in the Questions array.
2. Use the provided score (${score}) to generate the results.
3. Provide a star rating out of 5 based on the score. It must be a number between 1 and 5.
4. Assess the user's English proficiency level as either beginner, intermediate, or advanced based on their performance in different sections:
   - The first 5 questions are beginner level.
   - The next 5 questions are intermediate level.
   - The remaining 5 questions are advanced level.
   - If the user performs well in the first 5 questions, they are at the beginner level. Similarly, evaluate intermediate and advanced levels based on the respective questions.
5. Offer constructive feedback to help the user improve their English skills. Include what they need to learn next and identify any weak areas.

Please provide the evaluation in the following  format:note that it should be a valid JSON should not contain any special characters and unwanted strings at the begining and even the end of the following format.

{
  "total_score": ${score},
  "star_rating": "<star_rating>",
  "proficiency_level": "<proficiency_level>",
  "feedback": "<feedback>"
}

`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log(text)
        const evaluation = JSON.parse(text)
        res.json(evaluation)
    })
    return router
}
