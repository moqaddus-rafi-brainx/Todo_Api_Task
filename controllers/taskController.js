const Task = require('../models/taskModel');

//Create a task for the user.
const createTask = async (req, res) => {
    const userId=req.userId; //From Middleware
    const {description}=req.body;
    try{
        const task = await Task.create({ description,userId });
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
    const tasks= await Task.find({userId});
    if(tasks)
    {
        return res.status(200).send(tasks);
    }
    else
    {
        return res.status(200).send("No tasks found for this user");
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
            return res.status(404).send("No task found");
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
    const {description}=req.body;
    const task=await Task.findById(id);
    if(!task)
    {
        return res.status(404).send("No task found");
    }
    if(task.userId.toString()!=userId)
    {
        return res.status(400).send("No allowed");//if the task doesnt belong to the current user
    }
    task.description=description;
    await task.save();
    return res.status(200).send("Task Updated Successfully");


}

//Delete a specified task if it belongs to current user
const deleteTask=async(req,res)=>{
    const userId=req.userId;
    const taskId=req.params.id;
    try{
        const task=await Task.findById(taskId);
        if(!task)
        {
            return res.status(404).send("No task found");
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

module.exports = { createTask,updateTask,getAllTasks,getOneTask ,deleteTask};
