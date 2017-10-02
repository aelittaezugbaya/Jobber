import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderText extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    return(
      <h5 className="center">{this.props.text}</h5>
    );
  }
}

HeaderText.propTypes = {
  text: PropTypes.string,
};
