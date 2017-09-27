import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardImage extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const props = this.props;
    return(
      <div className="card-image">
        <img src={this.props.src}/>
          <span className="card-title">{this.props.title}</span>
      </div>
    );
  }
}

  CardImage.propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
  }
