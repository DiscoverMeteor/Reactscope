import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import Posts from './../../collections/Posts';

import PostItem from './PostItem';

@ReactMixin.decorate(ReactMeteorData)
export default class PostList extends Component {

  getMeteorData() {
    Meteor.subscribe('posts');

    const posts = Posts.find({}, {sort: {createdAt: -1}}).fetch();

    return {
      posts,
      user: Meteor.user()
    };
  }

  render() {
    if (!this.data.posts) {
      // loading
      return null;
    }

    return (

      <div className="posts page">
        <div className="wrapper">
          {this.data.posts.map(post => <PostItem key={post._id} _id={post._id} title={post.title} url={post.url} />)}
        </div>
      </div>
    );
  }
};
