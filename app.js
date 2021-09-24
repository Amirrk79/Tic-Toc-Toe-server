const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server , {
    cors: {
        origin: '*',
      }
})
const cors = require('cors')
const games = require('./game')
const queue = require('./queue')
const port = process.env.PORT || 8000
        
        

app.use(cors())




io.on('connection' , (socket) => {
    socket.on('add-queue' , (data) => {
        queue.MatchQueue(data)
        let currentQueue = queue.MatchQueue().find(queue => queue.matchId === data.matchId)
        if(currentQueue.player2.name !== null && currentQueue.player2.id !== null) {
            games.createMatch(currentQueue , io)
            io.emit('create-match' , currentQueue)
        }
    })
    socket.on('player-move' , (data) => {
      let newGame =  games.calculateGame(data.matchId , data.user , data.index)
        io.emit('player-moved' , newGame)
        if(newGame.winner !== null) {
            io.emit('end-game' , newGame.currentUser)
        }
    })
    socket.on('delete-match' , matchId => {
        games.RemoveMatch(matchId)
        queue.RemoveQueue(matchId)
        io.emit('match-ended' , matchId)
    })
   
    socket.on('reset-match' , matchId => {
        games.ResetMatch(matchId)
        io.emit('match-reseted' , matchId)
    })
  
    socket.on('find-match' , matchId => {
        io.emit('finded-match' , games.FindMatch(matchId))
    })
    socket.on('message' , messageInfo => {
        io.emit('new-message' , messageInfo)
    })
     
})

server.listen(port , () => {
    console.log('server is running on port 8000')
})

