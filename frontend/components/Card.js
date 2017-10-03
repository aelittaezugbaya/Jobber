import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardImage from './CardImage';

export default class Card extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const props = this.props;
    return(
      <div className="card">
        <CardImage title={this.props.title} src={this.props.src}/>
        <div className="card-content">
          <ul>
            <li><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></li>
            <li><strong>Email: </strong>{this.props.email}</li>
            <li><strong>Age: </strong>{this.props.age}</li>
            <li><strong>Gender: </strong>{this.props.gender}</li>
            <li><strong>Additional information: </strong>{this.props.additionalInfo}</li>
          </ul>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.string,
  gender: PropTypes.string,
  additionalInfo: PropTypes.string,
}
