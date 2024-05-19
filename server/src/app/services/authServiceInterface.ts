export interface AuthServiceInterface {
    encryptPassword(password: string): Promise<string>
    comparePassword(password: string, hashedPassword: string): Promise<boolean>
    generateToken(payload: object): string
    verifyToken(token: string): any
}
