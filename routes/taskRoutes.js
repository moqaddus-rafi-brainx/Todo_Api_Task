const express=require('express');
const router=express.Router();
const {createTask,updateTask,getAllTasks,getOneTask,deleteTask}=require('../controllers/taskController');
const {authenticate}=require('../middleware/authMiddleware');


router.post('/createTask',authenticate,createTask);
router.post('/updateTask/:id',authenticate,updateTask);
router.get('/getAllTasks',authenticate,getAllTasks);
router.get('/getOneTask/:id',authenticate,getOneTask);
router.get('/deleteTask/:id',authenticate,deleteTask);


module.exports=router;