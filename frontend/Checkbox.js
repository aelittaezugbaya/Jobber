import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return(
      <p>
        <input id={this.props.id} className="filled-in" type="checkbox"/>
        <label htmlFor={this.props.id}>{this.props.text}</label>
      </p>
    );
  }

}

Checkbox.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
};
