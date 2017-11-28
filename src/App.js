import React, { Component } from 'react'
import { connect } from 'react-redux'
import GMap from './components/GMap.js'
import geocoding from './gmap-reverse-geocode'
import NewTaskForm from './components/NewTaskForm.js'
import RunningTask from './components/RunningTask.js'
import AlertContainer from 'react-alert'
import './App.css'

import PropTypes from 'prop-types'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newTaskForm   : false,
      markerPosition: { lat: 40.71427, lng: -74.00597 },
      location      : 'New York, New York NY 10007'
    }

    this.handlerMapClick      = this.handlerMapClick.bind(this)
    this.handlerNewTaskForm   = this.handlerNewTaskForm.bind(this)
    this.handlerCloseTaskForm = this.handlerCloseTaskForm.bind(this)
    this.eachTask             = this.eachTask.bind(this)
  }

  handlerMapClick(event) {
    const config = {
      'latitude' : event.latLng.lat(),
      'longitude': event.latLng.lng(),
      'language' : 'en-us',
      'options'  : {
        'protocol': 'https:',
        'method'  : 'GET'
      }
    }
    geocoding.location(config, (err, data) => {
      if (err) {
        this.showAlert()
        this.setState({
          markerPosition: event.latLng
        })
      } else {
        this.setState({
          location      : data.results[0].formatted_address,
          markerPosition: event.latLng
        })
      }
    })
  }

  handlerNewTaskForm(event) {
    event.preventDefault()
    this.setState({ newTaskForm: true })
  }

  handlerCloseTaskForm(event) {
    event.preventDefault()
    this.setState({ newTaskForm: false })
  }

  eachTask(task, index) {
    return (
      <RunningTask
        key         = { index }
        index       = { index }
        date        = { task.date }
        id          = { task.id }
        title       = { task.title.trim() }
        description = { task.description }
        location    = { task.location }
      />
    )
  }

  render() {
    return (
      <div className = "container-fluid no-padding">
        <AlertContainer ref = {a => this.msg = a} {...this.alertOptions} />
        <GMap
          googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRmf_f2jQVe0XeSVKRlpI_u3Rfd_WTSFE&v=3.exp&libraries=geometry,drawing,places"
          loadingElement = {
            <div style = {{
              'width' : `100%`,
              'height': `100%`
            }} />
          }
          containerElement = {
            <div style = {{
              'width' : `100%`,
              'height': `100%`
            }} />
          }
          mapElement = {
            <div style = {{
              'width'   : `100%`,
              'height'  : `100%`,
              'top'     : `0`,
              'left'    : `0`,
              'position': `absolute`,
              'zIndex'  : `0`
            }} />
          }
          center = {{
            lat: 40.71427,
            lng: -74.00597
          }}
          zoom = { 16 }
          markerPosition = { this.state.markerPosition }
          handlerMapClick = { this.handlerMapClick }
        />
        <div className = "row">
          <div id = "running-tasks">
            <div
              className = "add-new-task"
              onClick   = { this.handlerNewTaskForm }>
              + NEW TASK
            </div>
            <ul className = "list-group">
              { this.props.runningTasks.map(this.eachTask) }
            </ul>
          </div>
          {
            this.state.newTaskForm
            ? <NewTaskForm
                location             = { this.state.location }
                handlerCloseTaskForm = { this.handlerCloseTaskForm }
              />
            : null
          }
        </div>
      </div>
    )
  }

  showAlert = () => {
    this.msg.show('Too many requests! Click a lil bit later!', {
      time: 2000,
      type: 'info'
    })
  }

  alertOptions = {
    offset    : 14,
    position  : 'top right',
    theme     : 'light',
    time      : 5000,
    transition: 'fade'
  }

}


App.propTypes = {
  runningTasks: PropTypes.array
}

function stateToProps(state) {
  return {
    runningTasks: state.tasks
  }
}
export default connect(stateToProps)(App)