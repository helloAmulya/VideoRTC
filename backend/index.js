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


io.on("connection", (socket) => {
    console.log("new Connection")
    socket.on('join-server', data => {

        const { roomId, emailID } = data
        console.log("User", emailID, "Joined Room", roomId)

        emailtoSocketMap.set(emailID, socket.id)
        socket.join(roomId)
        socket.emit('joined-room',{roomId})
        socket.broadcast.to(roomId).emit('user-joined', { emailID })
    })


});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

io.listen(3001)