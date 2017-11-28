import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import TaskConcatenateOnAir from './TaskConcatenateOnAir.js'
import Service from './Service.js'
import AlertContainer from 'react-alert'

import PropTypes from 'prop-types'


class NewTaskForm extends Component {

  constructor(props) {
    super(props)
    var savedServiceState = []
    for (var i=0; i < 5; i++) {
      savedServiceState.push({ task:'', description:'' })
    }
    this.state = {
      activeService    : null,
      activeServiceText: '',
      activeServiceTask: '',
      title            : '',
      description      : '',
      savedServiceState
    }

    this.addToDB           = this.addToDB.bind(this)
    this.handlerSubmitForm = this.handlerSubmitForm.bind(this)
    this.onChange          = this.onChange.bind(this)
    this.taskAlreadyExists = this.taskAlreadyExists.bind(this)
  }

  addToDB(data) {
    const req = new Request(`http://localhost:3001/new`, {
      method : 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body   : JSON.stringify(data)
    })
    fetch(req)
      .then(function(res) {
        res.json()
          .then(function(data) {
            console.log('New task added:' + JSON.stringify(data))
          })
      })
  }

  handlerSubmitForm(event) {
    event.preventDefault()
    var today = new Date(),
        monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ],
        date = (monthNames[today.getMonth()]) + ' '
          + today.getDate()
          + ', '
          + ('0' + today.getHours()).slice(-2) + ':'
          + ('0' + today.getMinutes()).slice(-2),
        uniqid = require('uniqid')
    let data = {
      id         : uniqid(),
      title      : this.state.title,
      description: this.state.description,
      location   : this.props.location,
      date       : date
    }
    this.props.addNewTask(data)
    this.addToDB(data)
  }

  toggleClick = (index) => (event) => {
    var preparingTitle =
      'I need a '
      + this.props.allServices[index].service.toLowerCase()
    if(this.state.savedServiceState[index].task) {
      preparingTitle +=
      ' ' + this.state.savedServiceState[index].task.toLowerCase()
    }

    this.setState({
      activeService    : index,
      activeServiceText: this.props.allServices[index].service.toLowerCase(),
      activeServiceTask: this.state.savedServiceState[index].task,
      title            : preparingTitle,
      description      : this.state.savedServiceState[index].description
    })
  }

  onChange(field, value) {
    this.setState({
      description: value
    })
  }

  taskAlreadyExists(task) {
    return task.title === this.state.title
  }

  render() {
    var serviceRows = []
    for (var i=0; i < 5; i++) {
      serviceRows.push(
        <Service
          onChange          = { this.onChange.bind(this) }
          index             = { i }
          key               = { i }
          allServices       = { this.props.allServices }
          service           = { this.props.allServices[i].service }
          serviceLogo       = { this.props.allServices[i].logo }
          isActive          = { this.state.activeService === i }
          savedServiceState = { this.state.savedServiceState }
          onClick           = { this.toggleClick(i) }
        />
      )
    }

    return (
      <div id = "new-task-form">
        <AlertContainer ref = {a => this.msg = a} {...this.alertOptions} />
        <div className = "preparing-task">
          <button
            className = "btn close-form"
            onClick   = { this.props.handlerCloseTaskForm }>
            X
          </button>
          <div className = "task-text">
            <h5>New Task</h5>
            <TaskConcatenateOnAir
              lexeme1 = { this.state.activeServiceText }
              lexeme2 = { this.state.activeServiceTask }
              lexeme3 = { this.state.description }
            />
          </div>
          <span className = "address">
            My address is { this.props.location }
          </span>
          {
            this.state.activeServiceText
            ? <button
                type      = "submit"
                className = "btn btn-primary"
                onClick   = {
                              this.props.runningTasks.find(this.taskAlreadyExists)
                              ? this.showAlert
                              : this.handlerSubmitForm
                            }>
                Create Task
              </button>
            : null
          }
        </div>
        <div className = "service-types-form">
          <div className = "location">
            <h5>Location</h5>
            { this.props.location }
          </div>
          <h5>Service Type</h5>
          <div className = "service-types">
            { serviceRows }
          </div>
        </div>
      </div>
    )
  }

  showAlert = () => {
    this.msg.show('You already added this task!', {
      time: 2000,
      type: 'error'
    })
  }

  alertOptions = {
    offset    : 14,
    position  : 'top left',
    theme     : 'dark',
    time      : 5000,
    transition: 'fade'
  }

}


NewTaskForm.propTypes = {
  allServices         : PropTypes.array,
  runningTasks        : PropTypes.array,
  location            : PropTypes.string.isRequired,
  addNewTask          : PropTypes.func,
  handlerCloseTaskForm: PropTypes.func
}

function stateToProps (state) {
  return {
    runningTasks: state.tasks,
    allServices : state.services
  }
}
function dispatchToProps (dispatch) {
  return {
    addNewTask: (task) => dispatch(actions.addNewTask(task))
  }
}
export default connect(stateToProps, dispatchToProps)(NewTaskForm)
