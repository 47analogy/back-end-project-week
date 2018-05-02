const express = require('express');

const User = require('../models/user.js');

const UserRouter = express.Router();

UserRouter.post('/', (req, res) => {
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
        error: 'There was an error while saving the User to the Database',
      });
    });
});

UserRouter.get('/', function(req, res) {
  User.find({})
    .then(Users => {
      res.status(200).send(Users);
    })
    .catch(err => {
      res.status(500).send({
        error: 'The information could not be retrieved.',
      });
    });
});

// UserRouter.get("/api/Users/:id", function (req, res) {
//     const { id } = req.params;
//     User.findById(id)
//         .then(foundUser => {
//             if (!foundUser)
//                 res.status(404).send("The User you are looking for does not exist!");
//             else res.status(201).send(foundUser);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 error: "The information could not be retrieved."
//             });
//         });
// });

// UserRouter.put("/api/Users/:id", function (req, res) {
//     const { id } = req.params;
//     const UserInfo = req.body;
//     if (!UserInfo.species || !UserInfo.latinName) {
//         res.status(400).send({
//             errorMessage:
//                 "Please provide both species and and latinName for the User."
//         })
//     }
//     else {
//         User.findByIdAndUpdate(id, UserInfo, { new: true, runValidators: true })
//             .then(updatedUser => {
//                 if (!updatedUser) {
//                     res
//                         .status(404)
//                         .send({
//                             errorMessage: "The User with the specified ID does not exist."
//                         });
//                 } else {
//                     res.status(200).send(updatedUser);
//                 }
//             })
//             .catch(err =>
//                 res.status(500).send({ errorMessage: "There was an error updateing the User!" })
//             );
//     }
// })

// UserRouter.delete("/api/Users/:id", function (req, res) {
//     const { id } = req.params;
//     User.findByIdAndRemove(id)
//         .then(removedUser => {
//             if (!removedUser) {
//                 res
//                     .status(404)
//                     .send({
//                         errorMessage: "The User with the specified ID does not exist."
//                     });
//             } else {
//                 res.status(200).send(removedUser);
//             }
//         })
//         .catch(err =>
//             res.status(500).send({ errorMessage: "There was an error deleting the User!" })
//         );
// });

module.exports = UserRouter;
