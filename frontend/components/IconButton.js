/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React, {Component} from 'react';

export default class IconButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className={`${this.props.classNameA} icon`} href={this.props.href} data-activates={this.props.menu}>
        <i className={`fa ${this.props.classNameI}`} aria-hidden="true" style={this.props.color}></i>
      </a>
    )
  }
}