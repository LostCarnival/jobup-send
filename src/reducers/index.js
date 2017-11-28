import { combineReducers } from 'redux'
import servicesReducer from './servicesReducer'
import tasksReducer from './tasksReducer'

const allReducers = combineReducers ({
  services:servicesReducer,
  tasks:tasksReducer
})

export default allReducers