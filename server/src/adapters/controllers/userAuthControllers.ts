
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
            console.log(sendOtp)

            const success = await this.authUseCase.register( username, email,  password  )
            if (success) {
                res.status(201).json({
                    message: "User registered successfully",
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
            const result: AuthResponse | null = await this.authUseCase.login(
                email,
                password
            )

            if (result) {
                const { token, user } = result
                res.status(200).json({
                    message: "Login successful",
                    token,
                    user,
                })
            } else {
                res.status(401).json({ message: "Invalid email or password" })
            }
        } catch (error) {
            console.error("Error during login:", error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    async generateOtp(req: Request, res: Response): Promise<void> {
       const {phonenumber}=req.body
        this.authUseCase.generateOtp(phonenumber)
        res.status(200).json({ message: "OTP generated successfully" })
    }
}
