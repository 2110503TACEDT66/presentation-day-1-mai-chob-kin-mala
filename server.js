const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config({path:'./config/config.env'});
connectDB();

const cars = require('./routes/cars');

app.use(express.json());
app.use('/api/v1/cars',cars);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('Server running in',process.env.NODE_ENV,'mode on PORT',PORT);
});

process.on('unhandledRejection',(err,promise) => {
    console.log('ERR:',err.message);
    server.close(()=>{process.exit(1)});
});