import React, { Component } from 'react'
import ServiceTaskItem from './ServiceTaskItem.js'

import PropTypes from 'prop-types'


class ServiceTasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskIndex        : null,
      savedServiceState: this.props.savedServiceState
    }
  }

  toggleClickTask = (index) => {
    var savedServiceState =
      this.state.savedServiceState
    savedServiceState[this.props.currentService].task =
      'to ' + this.props.allServices[this.props.currentService].tasks[index] //coz the props are immutable
    this.setState({
      taskIndex        : index,
      savedServiceState: savedServiceState
    })
  }

  render() {
    var tasksRows = [];
    for (var i=0; i < 6; i++) {
      if(this.props.allServices[this.props.currentService].tasks[i]) {
        tasksRows.push(
          <ServiceTaskItem
            index    = { i }
            key      = { i }
            onClick  = { this.toggleClickTask }
            isActive = { this.state.taskIndex === i }
            content  = { this.props.allServices[this.props.currentService].tasks[i] }
          />
        )}
    }

    return (
      <div className = "all-tasks">
        <h5>
          { this.props.allServices[this.props.currentService].service } Tasks
        </h5>
          { tasksRows }
      </div>
    )
  }

}


ServiceTasks.propTypes = {
  currentService   : PropTypes.number.isRequired,
  savedServiceState: PropTypes.array,
  allServices      : PropTypes.array.isRequired
}

export default ServiceTasks