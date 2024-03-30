const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const config=(app)=>{
    dotenv.config()
    app.disable('x-powered-by');
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
}

module.exports=config;