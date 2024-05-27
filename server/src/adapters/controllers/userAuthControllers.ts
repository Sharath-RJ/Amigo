
import { Request, Response } from "express"
import { AuthUseCase } from "../../app/useCases/auth/userAuth"
import { AuthResponse } from "../../types/authResponse"

export class AuthController {
    constructor(private authUseCase: AuthUseCase) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, PhoneNumber } = req.body
            console.log("meflemlfml", PhoneNumber)
            const sendOtp = await this.authUseCase.generateOtp(PhoneNumber)
            console.log("ooootttpp",sendOtp)
            const success = await this.authUseCase.register(
                username,
                email,
                password,
                PhoneNumber
            )
            if (success) {
                res.status(201).json({
                    message: "User registered successfully",
                    otp: sendOtp,
                })
            } else {
                res.status(400).json({ error: "Registration failed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            console.log("Received login request for email:", email)
            const result: AuthResponse | null = await this.authUseCase.login(
                email,
                password
            )

            if (result) {
                const { token, user } = result
                console.log("Login successful for user:", user)
                res.status(200).json({
                    message: "Login successful",
                    token,
                    user,
                })
            } else {
                console.log("Invalid email or password for email:", email)
                res.status(401).json({ message: "Invalid email or password" })
            }
        } catch (error) {
            console.error("Error during login:", error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    async generateOtp(req: Request, res: Response): Promise<void> {
        try {
            let temporaryStore: {
                [key: string]: {
                    otp: string
                    username: string
                    email: string
                    password: string
                    phoneNumber: string
                }
            } = {}
             const { username, email, password, phoneNumber } = req.body
             console.log("inside conteoller", req.body)
            const otp= this.authUseCase.generateOtp(phoneNumber)
             temporaryStore[phoneNumber] = { otp, ...req.body }
             console.log(temporaryStore)
             res.status(200).json({ message: "OTP generated successfully" })
             
        } catch (error) {
            console.log(error) 
        }
       
    }
}
