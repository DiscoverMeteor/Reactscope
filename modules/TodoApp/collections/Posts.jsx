const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    Timetstamp of post creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    URL
  */
  url: {
    type: String,
    optional: true
  },
  /**
    Title
  */
  title: {
    type: String,
    optional: false
  }
});

Posts.attachSchema(Posts.schema);

export default Posts;
