
import mongoose, { Document, Schema } from "mongoose"

export interface UserDocument extends Document {
    username: string
    email: string
    password: string
    phoneNumber: String
    followers: mongoose.Types.ObjectId[]
    following: mongoose.Types.ObjectId[]
    isBlocked: boolean
    profilePic: string
    isLive: boolean
    liveLink: string
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isBlocked: { type: Boolean, default: false },
    profilePic: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.Ii15573m21uyos5SZQTdrAHaHa&pid=Api&P=0&h=180",
    },
    isLive: { type: Boolean, default: false },
    liveLink: { type: String },
})

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)
