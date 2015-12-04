import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './css/AdminApp.import.css';

import Header from '../../TodoApp/client/components/Header';

export default class AdminApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className={style.container}>
        <Header/>
        <Link to="/">Back</Link>
        <h1>Admin</h1>
        {this.props.children}
      </div>
    )
  }
}
