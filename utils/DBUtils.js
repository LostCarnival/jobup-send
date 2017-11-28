import mongoose from 'mongoose'
import bluebird from 'bluebird'
import '../models/Task'
import config from '../config'

mongoose.Promise = bluebird
const Task = mongoose.model('Task')

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
    useMongoClient: true
  })
}

export function listTasks() {
  return Task.find()
}

export function createTask(data) {
  const task = new Task({
    id         : data.id,
    title      : data.title,
    description: data.description,
    location   : data.location,
    date       : data.date
  })
  return task.save()
}

export function deleteTask(id) {
  return Task.findOne({ id: id }).remove()
}

export function editTask(data, id) {
  return Task.findOneAndUpdate(
    { id: id },
    { 'title'      : data.title,
      'description': data.description,
      'location'   : data.location,
      'date'       : data.date }
  )
}