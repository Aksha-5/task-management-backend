const User = require('../models/userModel');

const addEmp = async(req, res) => {
	try {
	const { empId, name, email, password, role, department, designation } = req.body;
	const empExists = await User.findOne({ empId });
	if (empExists){
		return res.status(200).json('Employee already added');
	}
	const newEmp = await User.create({
		empId,
		name,
        email,
        password,
        role,
        department,
        designation
	});

	return res.status(200).json('Successfully added.')	
	} catch (error) { 
		console.error(error); 
		return res.status(500).json({ message: "Server error", error: error.message }); 
	}
};

const listEmp = async(req, res) => {
	try {
		const employees = await User.find();
		return res.status(200).json(employees)
	} catch (error) {
		return res.status(400).json({ message: "Server error", error: error.message })
	}
}

const updateEmp = async(req, res) => {
	try {
		const { empId } = req.params; 
		const updates = req.body;

		const updatedUser = await User.findOneAndUpdate( { empId }, updates, { new: true } );
		if (!updatedUser) return res.status(404).json({ message: 'User not found' });
		
		return res.status(200).json('Employee details updated successfully')
	} catch (error) {
		console.error(error)
	}
}

const deleteEmp = async(req, res) => {
	try{
		const { empId } = req.params;
		
		const emp = await User.findOne({ empId });
		if(!emp){	
			return res.status(400).json('Employee not found')
		}
		await User.deleteOne({empId})
		return res.status(200).json('Employee deleted successfully')
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', error: error.message }); 
	}
}

module.exports = {
	addEmp,
	listEmp,
	updateEmp,
	deleteEmp
};