const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({path:'./config/config.env'});

const cars = require('./routes/cars');

app.use(express.json());
app.use('/api/v1/cars',cars);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running in',process.env.NODE_ENV,'mode on PORT',PORT);
});