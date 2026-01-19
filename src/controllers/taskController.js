const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.createTask = async(req, res) => {
	try {
		const { taskID, title, description, dueDate } = req.body;
		const assignedUser = await User.findOne({ empId: req.body.assignedTo });
		const createdUser = await User.findOne({ empId: req.body.createdBy });
		const findTask = await Task.findOne({ taskID });
		if (findTask){
			return res.status(400).json('Task already added')
		}

		const task = await Task.create({
			taskID, 
			title, 
			description, 
			status: 'Assigned',
			assignedTo: assignedUser._id,
			createdBy: createdUser._id,
			dueDate
		})
		return res.status(200).json({ message:'Task has been added', task});

	} catch (error) {
    	return res.status(500).json({ message: "Server error", error: error.message });
  	}
}

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({}).populate('assignedTo', 'empId').populate('createdBy', 'empId');
		if (!tasks || tasks.length === 0) {
		return res.status(404).json("No tasks found for this user");
		}
		return res.status(200).json(tasks);

	} catch (error) {
		return res.status(500).json("Server error", error);
	}
};

exports.viewAllTasks = async (req, res) => {
    try {
		const tasks = await Task.find({}).populate('assignedTo', 'empId').populate('createdBy', 'empId');
		return res.status(200).json(tasks);
	} catch (error) {
		return res.status(500).json("Server error", error);
	}
};

exports.updateStatus = async (req, res) => {
	try {
		const { taskid } = req.params;
		const { status } = req.body;

		const task = await Task.findOne({ taskID: taskid });
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		task.status = status;
		await task.save();
		return res.status(200).json({ message: "Task status updated", task});
	} catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
};

exports.deleteTask = async(req, res) => {
	try {
		const { taskID } = req.params;
		const findTask = await Task.findOne({ taskID });
		if (!findTask){
			return res.status(400).json({ message:'Task not found', findTask })
		}

		await Task.deleteOne({ taskID })
		return res.status(200).json('Task has been deleted')
	} catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
}	
