const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

const port = process.env.PORT||5000

//init middleware
app.use(express.json({extended:false}));



app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/post'));

app.listen(port, ()=>console.log(`sever started in port ${port}`));
