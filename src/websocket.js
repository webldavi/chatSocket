const {io} = require("./http.js")


const users = []
const messages = []
io.on("connection", socket=>{
    socket.on('selected_room', payload=>{
        socket.join(payload.room)
        const userInRoom = users.find(user=>user.username === payload.username && user.room === payload.room)
        if(userInRoom){
            userInRoom.socket_id = socket.id
        }else{
            users.push({
                room: payload.room,
                username: payload.username,
                socket_id: socket.id
            })
        }

        
    })

    socket.on('send_new_message', payload=>{
        const message = {
            room: payload.room,
            username: payload.username,
            text: payload.message,
            createdAt: new Date()
        }
        messages.push(message);

        io.to(payload.room).emit('send_new_message', message)
    })
})