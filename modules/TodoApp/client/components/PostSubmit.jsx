import { Component, PropTypes } from 'react';
import Posts from './../../collections/Posts';

import ReactMixin from 'react-mixin';

// import { createHistory } from 'history'
// let history = createHistory();

export default class PostSubmit extends Component {

  submitPost(event) {
    // 1. Stop the form from submitting
    event.preventDefault();

    console.log(this)

    // 2. Take the data from the form and create an object
    const post = {
      url : this.refs.url.value,
      title : this.refs.title.value
    }

    Meteor.call('postInsert', post);

    // history.pushState(null, '/');

  }

  render () {
    return (
      <form className="main form page" onSubmit={this.submitPost.bind(this)}>
        <div className="form-group">
          <label className="control-label" htmlFor="url">URL</label>
          <div className="controls">
              <input name="url" ref="url" id="url" type="text" placeholder="Your URL" className="form-control"/>
              <span className="help-block"></span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="title">Title</label>
          <div className="controls">
              <input name="title" ref="title" id="title" type="text" placeholder="Name your post" className="form-control"/>
              <span className="help-block"></span>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    )
  }
}