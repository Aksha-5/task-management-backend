const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
		empId:{
			type: String,
            required: true,
			unique: true
		},
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
			minlength: 6
        },
        role: {
            type: String,
            enum: ['admin', 'employee'],
            default: 'employee',
        },
        department: {
            type: String
        },
        designation: {
            type: String
        },
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;