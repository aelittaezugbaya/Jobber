import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    return(
      <div className={this.props.className}>
          <i className="material-icons prefix">{this.props.icon}</i>
          <input id={this.props.id} type={this.props.type} className={this.props.inputClass}/>
          <label htmlFor={this.props.id}>{this.props.text}</label>
      </div>
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  inputClass: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
};
