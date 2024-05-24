// socketConfig.ts
import { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"

export default function configureSocket(server: HttpServer): SocketIOServer {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*", // Adjust this according to your client origin
            methods: ["GET", "POST"],
        },
    })

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id)

        socket.on("joinRoom", (room) => {
            socket.join(room)
            console.log(`User ${socket.id} joined room ${room}`)
        })

        socket.on("sendMessage", (message) => {
            const { sender, receiver, content } = message
            // Emit message to the receiver's room
            io.to(receiver).emit("newMessage", { sender, content })
        })

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id)
        })
    })

    return io
}
