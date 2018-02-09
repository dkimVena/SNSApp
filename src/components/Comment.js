import React, { Component } from 'react';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  handleChange(e) {
    this.setState({
      contents: e.target.value
    });
  }

  handleComment(e) {
    this.props.onComment(this.state.contents, this.props.memoId, this.props.index).then(
      () => {
        this.setState({
          contents: ''
        });
      }
    );
  }

  render() {
    return (
      <div className="comment-write">
        <input
          // className="materialize-textarea"
          placeholder="Write down your comment"
          value={this.state.contents}
          onChange={this.handleChange}>
        </input>
        <a className="waves-effect waves-light btn" onClick={this.handleComment}>Save</a>
      </div>
    );
  }
}

export default Comment;
