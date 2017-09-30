import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RadioButton extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    return(
      <p className="col m6">
          <input name="gender" type="radio" id={this.props.id} />
          <label htmlFor={this.props.id}>{this.props.text}</label>
      </p>
    );
  }
}

RadioButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,

};
