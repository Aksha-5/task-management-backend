const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/createtask', taskController.createTask);
router.get('/viewtask/:id', taskController.getTasks);
router.get('/alltasks', taskController.viewAllTasks);
router.put('/updatestatus/:taskid', taskController.updateStatus);
router.delete('/deletetask/:taskID', taskController.deleteTask);

module.exports = router;