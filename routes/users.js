var express = require('express');
var router = express.Router();
var models = require('../models')
const authService = require('../services/auth');


/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        success: false,
        message: 'Login Failed'
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.send({
          success: true,
          token: token
        });
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});


router.get('/logout', function (req, res, next) {
  res.send('Logged out');
});


module.exports = router;
