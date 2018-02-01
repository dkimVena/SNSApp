import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // LISTEN ESC KEY, CLOSE IF PRESSED
    const listenEscKey = (evt) => {
      evt = evt || window.event;
      if(evt.keyCode == 27) {
        this.handleClose();
      }
    };
    document.onkeydown = listenEscKey;
  }

  handleClose() {
    this.handleSearch('');
    document.onKeyDown = null;
    this.props.onClose();
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
    this.handleSearch(e.target.value);
  }

  handleSearch(keyword) {
    this.props.onSearch(keyword);
  }

  handleKeyDown(e) {
    // IF PRESSED ENTER, TRIGGER TO NAVIGATE TO THE FIRST USER SHOWN
    if(e.keyCode === 13) {
      if(this.props.usernames.length > 0) {
        this.props.history.push('/wall/' + this.props.usernames[0].username);
        this.handleClose();
      }
    }
  }

  render() {

    const mapDataToLinks = (data) => {
        // IMPLEMENT: map data array to array of Link components
        // create Links to '/wall/:username'
        if(!data) return;
        return data.map((user, i) => {
          return (
            <Link onClick={this.handleClose} to={`/wall/${user.username}`} key={i}>
              {user.username}
            </Link>
          );
        });
    };

    return (
      <div className="search-screen white-text">
        <div className="right">
          <a className="waves-effect waves-light btn red lighten-1"
              onClick={this.handleClose}>CLOSE</a>
        </div>
        <div className="container">
          <input placeholder="Search a user"
                  value={this.state.keyword}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}></input>
          <ul className="search-results">
              { mapDataToLinks(this.props.usernames) }
          </ul>

        </div>
      </div>
    );
  }
}


export default withRouter(Search);
