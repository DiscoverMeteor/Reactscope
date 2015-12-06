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

  render () {
    if (!this.data.post) {
      // loading
      return null;
    }
    return (
      <div className="post-page page">
        <PostItem key={this.data.post._id} _id={this.data.post._id} title={this.data.post.title} url={this.data.post.url} />
      </div>
    )
  }
}