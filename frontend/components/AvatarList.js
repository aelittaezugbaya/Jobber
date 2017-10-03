import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AvatarList extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const props = this.props;
    return(
            <li className="collection-item avatar">
              <img src={this.props.src} alt="" className="circle"/>
                <span className="title">{this.props.name}</span>
                <p><strong>Comment:</strong><br/>{this.props.comment}</p>
                <a href="#!" className="secondary-content"><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></a>
            </li>
    );
  }
}

  AvatarList.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    comment: PropTypes.string,
  }
