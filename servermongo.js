import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import cors from 'cors';
import config from './config';
import * as db from './utils/DBUtils.js';
import './models/Task';

mongoose.Promise = bluebird;
const Task = mongoose.model('Task');

db.setUpConnection();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/new', (req, res) => {
  db.createTask(req.body).then(data => res.send(data));
});

app.delete('/remove/:id', (req, res) => {
  db.deleteTask(req.params.id).then(data => res.send(data));
});

app.post('/update/:id', (req, res) => {
  db.editTask(req.body, req.params.id).then(data => res.send(data));
});

const server = app.listen(config.dbServerPort, () => {
  console.log(`DBServer listening on port ${config.dbServerPort}!`);
});