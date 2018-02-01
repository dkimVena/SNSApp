// src/containers/Register.js
import React, { Component } from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(id, password) {
    return this.props.registerRequest(id, password).then(
      () => {
        if(this.props.status === 'SUCCESS') {
          Materialize.toast('Success! Please log in.', 2000);
          this.props.history.push('/login');
          return true;
        } else {
          /*
              ERROR CODES:
                  1: BAD USERNAME
                  2: BAD PASSWORD
                  3: USERNAME EXISTS
          */
          let errorMessage = [
              'Invalid Username',
              'Password is too short',
              'Username already exists'
          ];

          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
          Materialize.toast($toastContent, 2000);
          return false;
        }
      }
    );
  }
  render() {
      return (
          <div>
              <Authentication
                mode={false}
                onRegister={this.handleRegister}/>
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error
  };
}
export default connect(mapStateToProps, { registerRequest })(Register);
