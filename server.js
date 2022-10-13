const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection')

const app = express()

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs")
//app.set("view engine", path.resolve(__dirname, "views/ejs")) if you add another folder to keep all your ejs files 

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

//load router
app.use('/', require('./server/routes/router'))


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })