const express=require('express');
const router=express.Router();
const {createTask,updateTask,getAllTasks,getOneTask,deleteTask,shareTask}=require('../controllers/taskController');
const {authenticate}=require('../middleware/authMiddleware');



router.post('',authenticate,createTask);
router.patch('/:id',authenticate,updateTask);
router.get('',authenticate,getAllTasks);
router.get('/:id',authenticate,getOneTask);
router.delete('/:id',authenticate,deleteTask);
router.post('/:id',authenticate,shareTask);


module.exports=router;
