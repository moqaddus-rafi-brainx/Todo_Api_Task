export const sendTaskNotification = (io, connectedUsers, userId, message) => {
    const socketId = connectedUsers.get(userId.toString());
    if (socketId) {
      io.to(socketId).emit('notification', {
        message: message,
        timestamp: new Date(),
      });
    }
  };
  