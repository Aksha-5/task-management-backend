const express = require('express');
const taskRoute= require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const connectDB = require('./config/db')

require('dotenv').config();
const app = express();
connectDB();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));