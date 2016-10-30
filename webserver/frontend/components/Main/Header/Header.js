import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">SAVN</a>
          <ul className="nav navbar-nav">
              <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="supportedContentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose map</a>
                  <div className="dropdown-menu" aria-labelledby="supportedContentDropdown">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                  </div>
              </li>
          </ul>
          <form className="form-inline float-xs-right">
              <input className="form-control" type="text" placeholder="Simulation ID"/>
              <button className="btn btn-outline-success" type="submit">Join Simulation</button>
          </form>
      </nav>
    )
  }
}