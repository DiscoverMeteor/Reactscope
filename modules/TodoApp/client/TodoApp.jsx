import { Component, PropTypes } from 'react';

import Header from './components/Header';

export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
