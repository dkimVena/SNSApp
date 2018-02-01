import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class Memo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      contents: props.data.contents
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleStar = this.handleStar.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let current = {
      props: this.props,
      state: this.state
    };

    let next = {
      props: nextProps,
      state: nextState
    };

    let update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }
  toggleEdit() {
    if(this.state.editMode) {
      let id = this.props.data._id;
      let index = this.props.index;
      let contents = this.state.contents;

      this.props.onEdit(id, index, contents).then(
        () => {
          this.setState({
            editMode: !this.state.editMode
          });
        }
      );
    } else {
      this.setState({
        editMode: !this.state.editMode
      });
    }
  }

  handleChange(e) {
    this.setState({
      contents: e.target.value
    });
  }

  handleRemove() {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onRemove(id, index);
  }

  handleStar() {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onStar(id, index);
  }

  render() {
    let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;
    const { data, ownership } = this.props;

    const dropDownMenu = (
      <div className="option-button">
        <a className="dropdown-button"
          id={`dropdown-button-${data._id}`}
          data-activates={`dropdown-${data._id}`}
        >
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
          <li><a onClick={this.toggleEdit}>Edit</a></li>
          <li><a onClick={this.handleRemove}>Remove</a></li>
        </ul>
      </div>
    );

    const memoView = (
      <div className="card">
        <div className="info">
          <Link to={`/wall/${this.props.data.writer}`} className="username">{data.writer}</Link> wrote a log · <TimeAgo date={data.date.created}/>
          { this.props.data.is_edited ? editedInfo : undefined }
          { ownership ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          {data.contents}
        </div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button"
              style={starStyle}
              onClick={this.handleStar}>star</i>
          <span className="star-count">{data.starred.length}</span>
        </div>
      </div>
    );

    const editView = (
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
          <a onClick={this.toggleEdit}>Edit</a>
        </div>
      </div>
    );

    // EDITED info
    let editedInfo = (
      <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
    );

    return (
        <div className="container memo">
          { this.state.editMode ? editView : memoView }
        </div>
    );
  }

  componentDidUpdate() {
    // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN LOGGED IN)
    $('#dropdown-button-'+this.props.data._id).dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
  }

  componentDidMount() {
    // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN REFRESHED)
    $('#dropdown-button-'+this.props.data._id).dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
  }
}

export default Memo;
