import React, { Component } from 'react'
import ServiceTasks from './ServiceTasks.js'

import PropTypes from 'prop-types'


class Service extends Component {

  constructor(props) {
    super(props)
    this.state = {
      savedServiceState: this.props.savedServiceState
    }
  }

  toggleClick = () => this.props.onClick(this.props.index)

  handlerDescriptionChange(event) {
    var savedServiceState = this.state.savedServiceState
    const value = event.target.value
    const name = event.target.name
    savedServiceState[this.props.index].description = value
    this.setState({
      savedServiceState: savedServiceState
    })
    this.props.onChange(name, value)
  }

  render() {
    return (
      <div
        className = { this.props.isActive ? 'service-type active' : 'service-type' }
        onClick   = { this.toggleClick }>
        <span>
          <img src = { this.props.serviceLogo }
               alt = { this.props.service.toLowerCase() } />
        </span>
        <br/>
        <span className = "text">{ this.props.service }</span>
        <div>
          <ServiceTasks
            currentService    = { this.props.index }
            allServices       = { this.props.allServices }
            savedServiceState = { this.state.savedServiceState }
          />
          <div className = "task-description">
            <label htmlFor = "inputdescription">Task Description</label>
            <input
              name        = "description"
              type        = "text"
              index       = { this.props.index }
              className   = "form-control"
              id          = "inputdescription"
              onChange    = { this.handlerDescriptionChange.bind(this) }
              placeholder = "Description">
            </input>
          </div>
        </div>
      </div>
    )
  }

}


Service.propTypes = {
  isActive         : PropTypes.bool,
  index            : PropTypes.number.isRequired,
  savedServiceState: PropTypes.array,
  allServices      : PropTypes.array.isRequired,
  service          : PropTypes.string.isRequired,
  serviceLogo      : PropTypes.string.isRequired,
  onClick          : PropTypes.func,
  onChange         : PropTypes.func
}

export default Service