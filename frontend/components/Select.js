import React from 'react';

export default class Select extends React.Component {
  componentDidMount() {
    $('select').material_select();
  }
  renderOptions() {
    if(!this.props.options)
      return null;
    return this.props.options.map(option => (  
      <option value={option.value} key={option.value}>{option.text}</option>
    ))
  }

  get value() {
    return this.select.value;
  }
  render() {
    return(
      <div>
        <select ref={ref => this.select = ref}>
          <option value="" disabled selected>Choose your option</option>
          {this.renderOptions()}
        </select>
        <label>{this.props.label}</label>
      </div>
    )
  }
}