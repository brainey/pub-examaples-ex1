#!/usr/bin/env node

// server.js

'use strict';

const port = 3020;

const Promise = require("bluebird");
const express = require('express');
const router = express.Router();
const path = require('path');
//const pug = require('pug');
//const bodyparser = require('body-parser');

let app = express();

app.locals.sitename = "Vegetable World!";

//app.use(bodyparser.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

console.log(path.join(__dirname, "views"));

app.use((req, res, next) => {
	//res.locals.user = req.user;
	res.locals.user = {username: 'Bill'};
	next();
});

app.get('/', (req, res) => {
	return Promise.try(() => {
		return db("vegetables").limit(3);
	}).map((row) => {
		return row.name;
	}).then((vegetables) => {
		res.render('homepage', {
    	    vegetables: vegetables
    	});
	});
});

app.get("");

app.listen(port);

console.log(`Pug example 1 running on port ${port}.`)