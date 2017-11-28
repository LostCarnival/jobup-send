import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import PropTypes from 'prop-types'


class GMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      map: null
    }
  }

  mapLoaded(map) {
    if(this.state.map != null)
      return
    this.setState({
      map: map
    })
  }

  render() {
    return(
      <GoogleMap
        ref           = { this.mapLoaded.bind(this) }
        onClick       = { this.props.handlerMapClick }
        defaultZoom   = { this.props.zoom }
        defaultCenter = { this.props.center }>
        { this.props.markerPosition
          ? <Marker
              icon     = './gmap-marker.svg'
              position = { this.props.markerPosition }
            />
          : null
        }
      </GoogleMap>
    )
  }

}


GMap.propTypes = {
  handlerMapClick: PropTypes.func,
  markerPosition : PropTypes.object,
  center         : PropTypes.object.isRequired,
  zoom           : PropTypes.number.isRequired
}

export default withScriptjs(withGoogleMap(GMap))