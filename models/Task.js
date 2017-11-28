import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TaskSchema = new Schema(
  {
    id         : String,
    title      : String,
    description: String,
    location   : String,
    date       : String
  }
);

const Task = mongoose.model('Task', TaskSchema)