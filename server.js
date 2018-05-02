const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const url = process.env.MONGOLAB_URI;
const localDB = 'mongodb://localhost/notes-db';

mongoose
  // .connect(localDB)
  .connect(url)
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err =>
    console.log('database is not connected, BUT this is simply not true')
  );

const userController = require('./controllers/userController');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running good' });
});

server.use('/api/users', userController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
