//Needs to refactoring component
import React, { Component } from 'react'

import PropTypes from 'prop-types'


class TaskConcatenateOnAir extends Component {

  render() {
    return (
      <div>
        {
          this.props.lexeme1
          ? <span> I need a
              <b>
                 { " " + this.props.lexeme1 }
              </b>
            </span>
          : null
        }
        {
          this.props.lexeme2
          ? <span> to
              <b>
                 { " " + this.props.lexeme2.toLowerCase().replace('to ','') }
              </b>
            </span>
          : null
        }
        {
          this.props.lexeme3
          ? <span>,
              <b>
                 { " " + this.props.lexeme3.toLowerCase() }
              </b>
            </span>
          : null
        }
        {
          this.props.lexeme1
          ? <span>.</span>
          : null
        }
      </div>
    )
  }

}


TaskConcatenateOnAir.propTypes = {
  lexeme1: PropTypes.string,
  lexeme2: PropTypes.string,
  lexeme3: PropTypes.string
}

export default TaskConcatenateOnAir