import React from 'react';
import CustomPropTypes from '../../../Utils/CustomPropTypes.jsx';

export default class JourneyList extends React.Component {

  static propTypes = {
    simulationJourneys: React.PropTypes.arrayOf(CustomPropTypes.simulationJourney),
    pendingJourneys: React.PropTypes.arrayOf(CustomPropTypes.simulationJourney),
    handlers: React.PropTypes.object
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  render() {
    const simulationJourneys = this.props.simulationJourneys || [];
    const pendingJourneys = this.props.pendingJourneys || [];

    return (
      <div className="row" id="journey-list">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              Show current journeys
            </div>
            <div className="collapsible-body">
              <ul className="collection">
                {
                  simulationJourneys.map((journey, index) => {
                    return (
                      <li className="collection-item"
                          key={index}
                          onMouseEnter={(e) => this.props.handlers.handleJourneyMouseOver(journey, e)}
                          onMouseLeave={(e) => this.props.handlers.handleJourneyMouseOut(journey, e)}
                      >
                        { index + ": (" + journey.origin.lat + ", " + journey.origin.lng + ") -> (" + journey.destination.lat + ", " + journey.destination.lng + ")" }
                      </li>
                    )
                  })
                }
                {
                  pendingJourneys.map((journey, index) => {
                    return (
                      <li className="collection-item"
                          key={index}>
                        { "(Pending) " + index + ": (" + journey.origin.lat + ", " + journey.origin.lng + ") -> (" + journey.destination.lat + ", " + journey.destination.lng + ")" }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
