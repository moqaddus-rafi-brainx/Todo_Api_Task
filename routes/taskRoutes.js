const express=require('express');
const router=express.Router();
const {createTask,updateTask,getAllTasks,getOneTask,deleteTask}=require('../controllers/taskController');
const {authenticate}=require('../middleware/authMiddleware');


router.post('',authenticate,createTask);
router.patch('/:id',authenticate,updateTask);
router.get('',authenticate,getAllTasks);
router.get('/:id',authenticate,getOneTask);
router.delete('/:id',authenticate,deleteTask);


module.exports=router;