const express = require('express');

const User = require('../models/user.js');

const UserRouter = express.Router();

UserRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).send({
      errorMessage: 'Please provide both username and password for the User.',
    });

  const user = new User({ username, password });

  user
    .save()
    .then(savedUser => {
      console.log(user);
      res.status(201).send(savedUser);
    })
    .catch(err => {
      res.status(500).send({
        error: 'There was an error saving the user to the database',
      });
    });
});



UserRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = req.body;
  User.findOne({ username }).then(user => {
    if (user) {
      user.isPasswordValid(password).then(isValid => {
        if (isValid) {
          req.session.name = user.username;
          res.status(200).json({ sucess: true });
        } else {
          res.status(401).json({ sucess: false });
        }
      });
    }
  });
});


UserRouter.get('/', function(req, res) {
  User.find({})
    .then(Users => {
      res.status(200).send(Users);
    })
    .catch(err => {
      res.status(500).send({
        error: 'Could not get Users',
      });
    });
});

module.exports = UserRouter;
