import React from 'react';
import 'whatwg-fetch';

export default class LoginButton extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    handlers: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: this.props.token
    };
  }

  _handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  _handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const action = e.target.value;
    const url = "/" + action;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((response) => {
      if (!response.ok) {
        console.log("error logging in");
        return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        this.setState({ token: data.token });
        this.props.handlers.handleTokenChange(data.token);
      });
    })
    .catch((err) => {
      console.log("error logging in");
    })
  }

  render() {
    return (
      <div>
        <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.state.token ? 'Logged in' : 'Login'}
        </a>
        <div id="auth-dropdown" className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                type        = "username"
                value       = {this.state.username}
                onChange    = {::this._handleUserChange}
                className   = "form-control"
                placeholder = "Username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type        = "password"
                value       = {this.state.password}
                onChange    = {::this._handlePasswordChange}
                className   = "form-control"
                placeholder = "Password"
              />
            </div>
            <button
              type="submit"
              value="login"
              onClick={::this._handleFormSubmit}
              className="btn btn-default">
              Login
            </button>
            <button
              type="submit"
              value="register"
              onClick={::this._handleFormSubmit}
              className="btn btn-default">
              Register
            </button>
          </form>
        </div>
      </div>
    )
  }
}