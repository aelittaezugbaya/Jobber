import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputLogin extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    return(
      <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input id={this.props.id} type={this.props.type} className="validate"/>
          <label htmlFor={this.props.id}>{this.props.text}</label>
      </div>
    );
  }
}

InputLogin.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
};
