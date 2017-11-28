import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import AlertContainer from 'react-alert'

import PropTypes from 'prop-types'


class RunningTask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      error  : false
    }

    this.edit         = this.edit.bind(this)
    this.removeFromDB = this.removeFromDB.bind(this)
    this.remove       = this.remove.bind(this)
    this.saveToDB     = this.saveToDB.bind(this)
    this.save         = this.save.bind(this)
    this.cancel       = this.cancel.bind(this)
  }

  edit() {
    this.setState({ editing: true })
  }

  removeFromDB(id) {
    const req = new Request(`http://localhost:3001/remove/${id}`, {
      method: 'DELETE'
    })
    fetch(req)
      .then(function(res) {
        res.json()
          .then(function(data) {
            console.log('Task removed:' + JSON.stringify(data))
          })
      })
  }

  remove() {
    this.props.deleteTask(this.props.index)
    this.removeFromDB(this.props.id)
  }

  saveToDB(data, id) {
    const req = new Request(`http://localhost:3001/update/${id}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body  : JSON.stringify(data)
    })
    fetch(req)
      .then(function(res) {
        res.json()
          .then(function(data) {
            console.log('Task updated:' + JSON.stringify(data))
          })
      })
  }

  save(event) {
    event.preventDefault()
    if(this.refs.editTitle.value&&this.refs.editDate.value) {
      const data = {
        title      : this.refs.editTitle.value,
        description: this.refs.editDescription.value,
        location   : this.refs.editLocation.value,
        date       : this.refs.editDate.value
      }
      this.props.editTask(this.props.index, data)
      this.saveToDB(data, this.props.id)
      this.setState({ editing: false, error: false })
    } else {
      this.setState({ error: true })
    }
  }

  cancel(event) {
    event.preventDefault()
    this.setState({ editing: false, error: false })
  }

  render() {
    return (
      <div>
        <AlertContainer ref = {a => this.msg = a} {...this.alertOptions} />
        {
          this.state.editing||this.state.error
          ?
          <li
            className = "list-group-item"
            key       = { this.props.index }
            index     = { this.props.index }
          >
            <form>
              <label>Title
                <input
                  type         = "text"
                  defaultValue = { this.props.title }
                  ref          = "editTitle"
                  className    = "form-control"
                />
              </label>
              { this.state.error ? this.showAlert() : null }
              <label>Description
                <input
                  type         = "text"
                  defaultValue = { this.props.description }
                  ref          = "editDescription"
                  className    = "form-control"
                />
              </label>
              <label>Location
                <input
                  type         = "text"
                  defaultValue = { this.props.location }
                  ref          = "editLocation"
                  className    = "form-control"
                />
              </label>
              <label>Date
                <input
                  type         = "text"
                  defaultValue = { this.props.date }
                  ref          = "editDate"
                  className    = "form-control"
                />
              </label>
              <button
                className = "btn btn-primary"
                onClick   = { this.save }>
                Save
              </button>
              <button
                className = "btn btn-default"
                onClick   = { this.cancel }>
                Cancel
              </button>
            </form>
          </li>
          :
          <li
            className = "list-group-item"
            key       = { this.props.index }
            index     = { this.props.index }
          >
            <p>{ this.props.date }</p>
            <div className = "list-group-item-heading">
              { this.props.title }
            </div>
            <button
              className = "btn btn-primary"
              onClick   = { this.edit }>
              Edit
            </button>
            <button
              className = "btn btn-default"
              onClick   = { this.remove }>
              Delete
            </button>
          </li>
        }
      </div>
    )
  }

  showAlert = () => {
    this.msg.show('Title and date must be not empty!', {
      time: 2000,
      type: 'info'
    })
  }

  alertOptions = {
    offset    : 14,
    position  : 'top left',
    theme     : 'light',
    time      : 5000,
    transition: 'fade'
  }

}


RunningTask.propTypes = {
  index       : PropTypes.number.isRequired,
  deleteTask  : PropTypes.func,
  editTask    : PropTypes.func,
  id          : PropTypes.string.isRequired,
  title       : PropTypes.string.isRequired,
  date        : PropTypes.string.isRequired,
  location    : PropTypes.string.isRequired,
  description : PropTypes.string,
  runningTasks: PropTypes.array
}

function stateToProps (state) {
  return {
    runningTasks: state.tasks
  }
}
function dispatchToProps (dispatch) {
  return {
    deleteTask: (task) => dispatch(actions.deleteTask(task)),
    editTask: (id, task) => dispatch(actions.editTask(id, task))
  }
}
export default connect(stateToProps, dispatchToProps)(RunningTask)