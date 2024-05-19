// src/models/userModel.ts
import mongoose, { Document, Schema } from "mongoose"

export interface UserDocument extends Document {
    username: string
    email: string
    password: string
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)
