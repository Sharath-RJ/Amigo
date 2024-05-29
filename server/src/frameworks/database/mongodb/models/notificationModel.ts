const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: { type: String, required: true }, // "like", "comment", etc.
    content: { type: String, required: true }, // Brief description of event
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the relevant post
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Notification", notificationSchema)
