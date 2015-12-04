import Tasks from 'TodoApp/collections/Tasks';
import Posts from 'TodoApp/collections/Posts';

Meteor.methods({
  'fixtures/cleanTodo': () => {
    Tasks.remove({});
  },
  'fixtures/createPrivateTask': () => {
    Tasks.insert({
      text: 'this should be public',
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: 'test-user'
    });

    Tasks.insert({
      text: 'this should stay private',
      createdAt: new Date(),
      owner: 'verysecret',
      username: 'secretman',
      private: true
    });
  }
});
