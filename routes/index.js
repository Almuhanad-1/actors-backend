var express = require('express');
var router = express.Router();
var mysql = require('mysql2')
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
