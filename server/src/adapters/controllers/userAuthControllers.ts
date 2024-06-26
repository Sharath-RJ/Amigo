
import { Request, Response } from "express"
import { AuthUseCase } from "../../app/useCases/auth/userAuth"

export class AuthController {
    constructor(private authUseCase: AuthUseCase) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body
    
            const success = await this.authUseCase.register(
                username,
                email,
                password
            )
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
            const user = await this.authUseCase.login(email, password)
            if (user) {
                res.status(200).json({message: "Login successful",user:user})
            } else {
                res.status(401).json({error: "Login failed"})
            }
        } catch (error) {
            console.log
        }
    }
}
