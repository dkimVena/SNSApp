import React, { Component } from 'react';

class Write extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(e) {
    this.setState({
      contents: e.target.value
    });
  }

  handlePost(e) {
    this.props.onPost(this.state.contents).then(
      () => {
        this.setState({
          contents: ''
        });
      }
    );
  }

  render() {
    return (
      <div className="container write">
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea"
              placeholder="Write down your memo"
              value={this.state.contents}
              onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="card-action">
            <a onClick={this.handlePost}>POST</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Write;
