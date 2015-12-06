import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {

  render () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Nanoscope</a>
        </div>
        <div className="collapse navbar-collapse" id="navigation">
          <ul className="nav navbar-nav">
            <li className="">
              <Link to="/">Home</Link>
              <Link to="/submit">Submit</Link>
              <Link to="/about">About</Link>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}