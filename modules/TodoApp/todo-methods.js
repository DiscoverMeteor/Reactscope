import Tasks from 'TodoApp/collections/Tasks';
import Posts from 'TodoApp/collections/Posts';

Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});


Meteor.methods({
  postInsert: function(postAttributes) {
    // check(this.userId, String);
    // check(postAttributes, {
    //   title: String,
    //   url: String
    // });
    
    // var errors = validatePost(postAttributes);
    // if (errors.title || errors.url)
    //   throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    
    // var postWithSameLink = Posts.findOne({url: postAttributes.url});
    // if (postWithSameLink) {
    //   return {
    //     postExists: true,
    //     _id: postWithSameLink._id
    //   }
    // }
    
    // var user = Meteor.user();
    var post = _.extend(postAttributes, {
      // userId: user._id, 
      // author: user.username, 
      createdAt: new Date(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});
