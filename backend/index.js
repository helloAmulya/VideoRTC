import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'socket.io'

const PORT = 3000

// this start my websocket server 
const io = new Server(
    { cors: true }
)
const app = express()

app.use(cors())
app.use(bodyParser.json())


// this keeps track of the email id connected to socket id
const emailtoSocketMap = new Map()
const socketToEmailMap = new Map()

// socket : A two-way communication endpoint between two machines over a network.
// websocket : A full-duplex (send and receive / two way) communication protocol over a single, long-lived TCP connection between the client (browser) and the server.
/* 
    Sockets allow persistent, real-time, bidirectional communication between the client and server.  
    Unlike HTTP, where the client has to request updates, sockets let the server push updates immediately. 
    WebSockets are ideal for scenarios like chats, games, or live dashboards — anywhere latency and instant communication matter
 */

io.on("connection", (socket) => {
    console.log(`Socket connected`, socket.id)

    socket.on('room:join', data => {

        const { roomId, emailId } = data
        console.log("User", emailId, "Joined Room", roomId)

        emailtoSocketMap.set(emailId, socket.id)
        socketToEmailMap.set(socket.id, emailId)

        socket.join(roomId)
        socket.emit('joined-room', { roomId })
        // io.to(room).emit("user:joined", { emailId, id: socket.id });

        // socket.broadcast.to(roomId).emit('joined:room', { emailId })
        io.to(socket.id).emit('room:join', data)
    })



});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

io.listen(3001)