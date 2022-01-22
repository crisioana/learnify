let users = []

const socketServer = socket => {
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id})
  })

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id)
  })

  socket.on('sendBroadcast', data => {
    const peopleList = data.people

    users.forEach(client => {
      for (let i = 0; i < peopleList.length; i++) {
        if (client.id === peopleList[i]) {
          socket.to(`${client.socketId}`).emit('sendBroadcastToClient', data)
        }
      }
    })
  })

  socket.on('createQuiz', data => {
    const peopleList = data.to

    users.forEach(client => {
      for (let i = 0; i < peopleList.length; i++) {
        if (client.id === peopleList[i]) {
          socket.to(`${client.socketId}`).emit('createQuizToClient', data)
        }
      }
    })
  })

  socket.on('submitQuiz', data => {
    const peopleList = data.to

    users.forEach(client => {
      for (let i = 0; i < peopleList.length; i++) {
        if (client.id === peopleList[i]) {
          socket.to(`${client.socketId}`).emit('submitQuizToClient', data)
        }
      }
    })
  })
}

module.exports = socketServer