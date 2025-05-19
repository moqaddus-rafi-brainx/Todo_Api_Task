export const sendTaskNotification = (io, connectedUsers, userId, message,eventName) => {
    const socketId = connectedUsers.get(userId.toString());
    if (socketId) {
      io.to(socketId).emit(eventName.toString(), {
        message: message,
        timestamp: new Date(),
      });
    }
};

export const sendUpdateEvent=(io,uid,connectedUsers,task)=>{
  const socketId = connectedUsers.get(uid.toString());
  if (socketId) {
    io.to(socketId).emit('taskUpdated',task);
  }
} 

export const sendDeleteEvent=(io,connectedUsers,uid,id)=>{
  const socketId = connectedUsers.get(uid.toString());
  if (socketId) {
    io.to(socketId).emit('taskDeleted', { _id: id });
  }

}
  