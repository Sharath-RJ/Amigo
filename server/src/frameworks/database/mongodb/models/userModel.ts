
import mongoose, { Document, Schema } from "mongoose"

export interface UserDocument extends Document {
    username: string
    email: string
    password: string
    phoneNumber: String
    followers: mongoose.Types.ObjectId[]
    following: mongoose.Types.ObjectId[]
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isBlocked: { type: Boolean, default: false },
    profilePic: { type: String },
})

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)
