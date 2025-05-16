const Task = require('../models/taskModel');
const Auth=require('../models/authModel');
const {sendNotificationEmail}=require('../services/emailService');
const {sendTaskNotification}=require('../services/socketService');


//Create a task for the user.
const createTask = async (req, res) => {
    const userId=req.userId; //From Middleware
    const {description,deadline}=req.body;
    try{
        const taskDeadline = new Date(deadline);
        const task = await Task.create({ description,userId,deadline:taskDeadline });
        return res.status(201).send({message:"Task Created Successfully", task});
    }
    catch(error)
    {
        return res.status(500).send({message:error.message});
    }
    
}

//Get all tasks for current user
const getAllTasks=async(req,res)=>{
    const userId=req.userId;
    //const tasks= await Task.find({userId});
    const tasks=await Task.find({$or: [
        { userId: userId },
        { collaborators: userId}
      ]
    })
    
    if(tasks)
    {
        return res.status(200).send({tasks:tasks});
    }
    else
    {
        return res.status(200).send("No tasks found for this user");
    }
}

//share task(add collaborator,send mail, send notification)
const shareTask=async(req,res)=>{

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');

    const userId=req.userId;
    const {id}=req.params;
    const {email}=req.body;
    const user=await Auth.findOne({email});
    console.log('User',user);
    const task=await Task.findById(id);
    const sharedBy=await Auth.findById(userId);
    try {

        if(!task)
            {
                 return res.status(404).json({ message: 'Task not found' });
            }
            if(task.userId.toString()!=userId) //if the task doesnt belong to the current user
            {
                return res.status(400).json({ message: 'No allowed' });
            }
            if(!user)
            {
                return res.status(400).json({ message: 'User not found' });
            }
            if(user._id==userId)
            {
                return res.status(400).json({ message: 'You cannot share with yourself' });   
            }
            const alreadyCollaborator = task.collaborators.includes(user._id);
            if (alreadyCollaborator) {
                return res.status(400).json({ message: 'This user is already a collaborator' });
            }
            task.collaborators.push(user._id);
            await task.save();

            await sendNotificationEmail(email,'Task Share Notification',`<p>${sharedBy.email} shared a task with you</p><p>Task Description: ${task.description}</p>`)
            
            console.log('connected users:',connectedUsers);
            const message= `A task was shared by ${sharedBy.username} with you: "${task.description}"`;
            sendTaskNotification(io,connectedUsers,user._id,message)
            
            return res.status(200).json({ message: 'Email Sent Successfullly!!' });
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
}

//Get one specified task
const getOneTask=async(req,res)=>{
    const userId=req.userId;
    const taskId=req.params.id; //id of the task to be returned 
    try{
        const task=await Task.findById(taskId);
        if(!task)
        {
            return res.status(400).send("No task found");
        }
        if(task.userId.toString()!=userId) //if the task doesnt belong to the current user
        {
            return res.status(400).send("No allowed");
        }
        return res.status(200).send({task: task});

    }
    catch(error)
    {
        return res.status(500).send({message:error.message});
    }

}

//Update the specified task 
const updateTask=async(req,res)=>{
    const userId=req.userId;
    const {id}=req.params;
    const {description,isCompleted}=req.body;
    const task=await Task.findById(id);
    if(!task)
    {
        return res.status(400).send("No task found");
    }
    if(task.userId.toString()!=userId && !task.collaborators.includes(userId))
    {
        return res.status(400).send("No allowed");//if the task doesnt belong to the current user
    }
    task.description=description;
    task.isCompleted=isCompleted;
    await task.save();
    return res.status(200).send({message:"Task Updated Successfully",task:task});


}

//Delete a specified task if it belongs to current user
const deleteTask=async(req,res)=>{
    const userId=req.userId;
    const taskId=req.params.id;
    try{
        const task=await Task.findById(taskId);
        if(!task)
        {
            return res.status(400).send("No task found");
        }
        if(task.userId.toString()!=userId)
        {
            return res.status(400).send("No allowed"); //if the task doesnt belong to the current user
        }
        await Task.deleteOne({_id:taskId});
        return res.status(200).send("Task Deleted Successfully");

    }
    catch(error){
        return res.status(500).send(error.message);

    }
}

module.exports = { createTask,updateTask,getAllTasks,getOneTask ,deleteTask,shareTask};
