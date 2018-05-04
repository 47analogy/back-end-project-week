const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const db = process.env.MONGOLAB_URI || 'mongodb://localhost/notes-db';

// const url = process.env.MONGOLAB_URI; //mlab mongo
// const localDB = 'mongodb://localhost/notes-db'; //local mongo

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

mongoose
  // .connect(localDB)
  // .connect(url)
  .connect(db)
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('database is not connected'));

const userController = require('./controllers/userController');
const server = express();

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running good' });
});

server.use('/api/users', userController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
