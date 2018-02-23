import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    let id = this.state.username;
    let password = this.state.password;

    this.props.onLogin(id, password).then(
      (success) => {
        if(!success) {
          this.setState({
            password: ''
          });
        }
      }
    );
  }

  handleRegister() {
    let id = this.state.username;
    let password = this.state.password;

    this.props.onRegister(id, password).then(
      (success) => {
        if(!success) {
          this.setState({
            username: '',
            password: ''
          });
        }
      }
    );
  }

  handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

  render() {
    const inputBoxes = (
      <div>
        <div className="input-field col s12 username">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="validate"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </div>
        <div className="input-field col s12">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="validate"
            onChange={this.handleChange}
            value={this.state.password}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );

    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a
              className="waves-effect waves-light btn"
              onClick={this.handleLogin}>SUBMIT</a>
          </div>
        </div>
        <div className="footer">
          <div className="card-content">
            <div className="right">
              New Here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <a
            className="waves-effect waves-light btn"
            onClick={this.handleRegister}>CREATE</a>
        </div>
      </div>
    );

    return (
      <div className="container auth">
        <Link className="logo" to="/">DAILY BOARD</Link>
        <div className="card">
          <div className="header white-text center">
            <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
          </div>
          {this.props.mode ? loginView : registerView }
        </div>
      </div>
    );
    }
}
