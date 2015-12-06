import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Posts from './../../collections/Posts';

import PostItem from './PostItem';

@ReactMixin.decorate(ReactMeteorData)
export default class PostPage extends Component {

  getMeteorData() {

    Meteor.subscribe('singlePost', this.props.params.postId);
    const post = Posts.findOne({_id: this.props.params.postId});

    return {
      post,
      user: Meteor.user()
    };

  }

  editPost(event) {
    // 1. Stop the form from submitting
    event.preventDefault();

    console.log(this)

    // 2. Take the data from the form and create an object
    const post = {
      _id: this.data.post._id,
      url : this.refs.url.value,
      title : this.refs.title.value
    }

    Meteor.call('postEdit', post);

    // history.pushState(null, '/');

  }

  render () {
    if (!this.data.post) {
      // loading
      return null;
    }
    return (
      <form className="main form page" onSubmit={this.editPost.bind(this)}>
        <div className="form-group">
          <label className="control-label" htmlFor="url">URL</label>
          <div className="controls">
              <input name="url" ref="url" id="url" type="text" placeholder="Your URL" className="form-control" defaultValue={this.data.post.url}/>
              <span className="help-block"></span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="title">Title</label>
          <div className="controls">
              <input name="title" ref="title" id="title" type="text" placeholder="Name your post" className="form-control" defaultValue={this.data.post.title}/>
              <span className="help-block"></span>
          </div>
        </div>
        <input type="submit" value="Update" className="btn btn-primary"/>
      </form>
    )
  }
}
