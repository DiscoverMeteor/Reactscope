import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import Posts from 'TodoApp/collections/Posts';

import style from './css/TodoApp.import.css'
import style2 from './css/Microscope.import.css'

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  state = {
    hideCompleted: false
  }

  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    return (
        <div className={style.container}>
          <Link to="/admin">Admin</Link>
          <TodoHeader
              incompleteCount={this.data.incompleteCount}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <TodoList tasks={this.data.tasks} />
        </div>
    );
  }
};
