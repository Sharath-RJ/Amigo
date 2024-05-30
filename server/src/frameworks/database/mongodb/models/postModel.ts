import mongoose from "mongoose"
import { Schema, model, Document, Types } from "mongoose"

interface PostDoc extends Document {
    user: Types.ObjectId
    image: string[]
    caption?: string
    liked: boolean
    likes: mongoose.Types.ObjectId[]
    status: string
    comments: {
        user: Types.ObjectId
        text: string
        createdAt?: Date
    }[]
    createdAt?: Date
}

const postSchema = new Schema<PostDoc>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    caption: {
        type: String,
        maxlength: 380,
    },
    liked: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "Not Published",
    },
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userid: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const PostModel = model<PostDoc>("Post", postSchema)

export default PostModel
