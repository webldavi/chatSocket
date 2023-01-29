const express = require("express")
const http = require('http')
const app = express()
const { Server } = require("socket.io")
const path = require('path')
const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

app.use(express.static(path.join(__dirname, "public")))


module.exports = {
    serverHttp,
    io
}