const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	taskID: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['Pending', 'In Progress', 'Completed', 'Assigned'],
		default: 'Pending'
	},
	assignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	dueDate: {
		type: Date
	},
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;