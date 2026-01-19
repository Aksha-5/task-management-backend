const User = require('../models/userModel');

exports.register = async(req, res) => {
	const { id, name, email, password, role, department, designation } = req.body;

	try {
		const user = await User.findOne({ id });
		if(user){ 
			res.status(400); 
			throw new Error('User already registered.')	
		}

		const userCreate = await User.create({
			id, name, email, password, role, department, designation
		});

		if(userCreate){
			res.status(201).json('User is registered');
		}
	} catch (error) {
		console.error(error);
	}
};

exports.login = async(req, res) => {
	const { empId, password } = req.body;
    try {
        const user = await User.findOne({ empId });
        if (!user) {
            return res.status(400).json('Invalid id or user not registered');
        }

		if (user.password !== password) { 
			return res.status(400).json({ message: 'Invalid password' })
		}
		else {
			return res.status(200).json({ message: 'Login successful', 
				user: { 
					empId: user.empId, 
					name: user.name, 
					role: user.role, 
					department: user.department }
			});
		}
	} catch (error) {
		console.error(error);
	}
};