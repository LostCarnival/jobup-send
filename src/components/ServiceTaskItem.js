import React, { Component } from 'react'

import PropTypes from 'prop-types'


class ServiceTaskItem extends Component {

  toggleClickTask = () => this.props.onClick(this.props.index)

  render() {
    return(
      <span
        className = { this.props.isActive ? 'active' : null }
        onClick   = { this.toggleClickTask }
      >
        { this.props.content }
      </span>
    )
  }

}


ServiceTaskItem.propTypes = {
  isActive: PropTypes.bool,
  index   : PropTypes.number.isRequired,
  content : PropTypes.string.isRequired
}

export default ServiceTaskItem