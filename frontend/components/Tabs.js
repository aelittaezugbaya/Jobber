/**
 * Created by aelittaezugbaa on 13/09/2017.
 */
import React from 'react';
import Actions from '../common/actions';
import {connect} from 'react-redux';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    this.props.onTabClick(ev.target.textContent)
  }

  renderTabs() {
    let tabs = [];
    for (let tab of this.props.tabs) {
      tabs.push(
        <li className="tab" onClick={this.onClick} key={tab}><a href="#test1">{tab}</a></li>
      )
    }
    return tabs;
  }

  render() {
    return (
      <ul className={`tabs ${this.props.className}`}>
        {this.renderTabs()}
      </ul>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTabClick: (clickedTab) => {
      dispatch(Actions.changeTab(clickedTab));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    openTab: state.openTab
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);