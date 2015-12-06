import { Component, PropTypes } from 'react';

import Header from './components/Header';

export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
