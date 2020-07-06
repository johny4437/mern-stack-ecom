const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const expressValidator = require('express-validator');
const cors = require('cors');
// app
const app = express();


mongoose.connect(process.env.URL_DATABASE,
     {useNewUrlParser:true, useCreateIndex:true,   useUnifiedTopology: true }
     ).then(()=>console.log("DB CONNECTED"))

//middleware
app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(expressValidator());

//routes
app.use("/api",authRouter);
app.use("/api",userRouter);
app.use("/api",categoryRouter);
app.use("/api",productRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log("SERVER IS ON:::", PORT);
})