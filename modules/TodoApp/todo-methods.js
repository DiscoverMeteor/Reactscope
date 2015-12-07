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


Posts.methods = {};

// Attach your method to a namespace
Posts.methods.insert = new Method({
  // The name of the method, sent over the wire. Same as the key provided
  // when calling Meteor.methods
  name: 'Posts.methods.insert',

  // Validation function for the arguments. Only keyword arguments are accepted,
  // so the arguments are an object rather than an array. The SimpleSchema validator
  // throws a ValidationError from the mdg:validation-error package if the args don't
  // match the schema
  validate: Posts.schema.validator(),

  // This is the body of the method. Use ES2015 object destructuring to get
  // the keyword arguments
  run(postAttributes) {
 
    var post = _.extend(postAttributes, {
      createdAt: new Date()
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };

  }
});

Posts.methods.update = new Method({
  // The name of the method, sent over the wire. Same as the key provided
  // when calling Meteor.methods
  name: 'Posts.methods.update',

  // Validation function for the arguments. Only keyword arguments are accepted,
  // so the arguments are an object rather than an array. The SimpleSchema validator
  // throws a ValidationError from the mdg:validation-error package if the args don't
  // match the schema
  validate: Posts.schema.validator(),

  // This is the body of the method. Use ES2015 object destructuring to get
  // the keyword arguments
  run(postAttributes) {
 
    Posts.update({_id: postAttributes._id}, {$set: {title: postAttributes.title, url: postAttributes.url}});

  }
});
