import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { searchRequest } from 'actions/search';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Home, Login, Register, Wall } from 'containers';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest().then(
      () => {
        Materialize.toast('Good Bye!', 2000);

        // EMPTIES THE SESSION
        let loginData = {
          isLoggedIn: false,
          username: ''
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
      }
    );
  }

  handleSearch(username) {
    this.props.searchRequest(username);
  }

  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');

    // if loginData is undefined, do nothing
    if(typeof loginData === 'undefined') return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if(!loginData.isLoggedIn) return;

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        // if session is not valid
        if(!this.props.status.valid) {
          // logout the session
          loginData = {
            isLoggedIn: false,
            username: ''
          }
          document.cookie='key=' + btoa(JSON.stringify(loginData));

          // and notify
          let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          Materialize.toast($toastContent, 4000);
        }
      }
    )
  }
  render(){
    /* Check whether current route is login or register using regex */
    let re = /(login|register)/;
    let isAuth = re.test(location.pathname);

    return (
      <div>
        { isAuth ? undefined : <Header
          isLoggedIn={this.props.status.isLoggedIn}
          onLogout={this.handleLogout}
          onSearch={this.handleSearch}
          usernames={this.props.usernames}/> }
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/wall/:username" component={Wall} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        usernames: state.search.usernames
    };
};

export default withRouter(connect(mapStateToProps, { getStatusRequest, logoutRequest, searchRequest })(App));
