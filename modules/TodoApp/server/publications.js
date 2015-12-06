import Tasks from 'TodoApp/collections/Tasks';
import Posts from 'TodoApp/collections/Posts';

// This code only runs on the server
Meteor.publish('tasks', function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

Meteor.publish('posts', function() {
  // check(options, {
  //   sort: Object,
  //   limit: Number
  // });
  return Posts.find({});
});

Meteor.publish('singlePost', function(id) {
  // check(id, String);
  return Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  // check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
