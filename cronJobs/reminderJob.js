const cron = require('node-cron');
const Task = require('../models/taskModel');
const Auth = require('../models/authModel');
const {sendNotificationEmail} = require('../services/emailService');
const {sendTaskNotification}=require('../services/socketService');

module.exports = function startTaskReminderCron(io, connectedUsers) {
  cron.schedule('* * * * *', async () => { //runs every minute
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await Task.find({
      deadline: {
        $gte: new Date(oneHourFromNow.getTime() - 60000), //1 minute before
        $lte: oneHourFromNow,
      },
      reminderSent: { $ne: true },
      isCompleted:false,
    });

    for (const task of tasks) {
      const user = await Auth.findById(task.userId);
      if (!user) continue;

      await sendNotificationEmail(
        user.email,
        'Task Deadline Reminder',
        `<p>Your task is pending (1 hour remaining). Task Description: ${task.description}</p>`
      );

      task.reminderSent = true;
      await task.save();
      const message= `(1 hour remaining) Your deadline for the following task is about to meet: "${task.description}"`;
      sendTaskNotification(io,connectedUsers,user._id,message)
    }
  });
};

