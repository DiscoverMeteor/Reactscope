import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostItem extends Component {

  static propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string
  }

  render () {
    return (
      <div className="post">
        <a href="#" className="upvote btn btn-default">⬆</a>
        <div className="post-content">
          <h3><a href={this.props.url}>{this.props.title}</a></h3>
        </div>
        <Link to={'post/'+this.props._id} className="discuss btn btn-default">Discuss</Link>
      </div>    
    )
  }
}