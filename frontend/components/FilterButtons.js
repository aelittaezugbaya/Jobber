import React from 'react';
import { connect } from 'react-redux';
import MenuSide from './MenuSide/MenuSide';
import AddForm from './AddForm';
import IconButton from './IconButton';


class FilterButtons extends React.Component{
  render() {
    return(
      <div>
        <MenuSide id='filter_menu' offers={['dogs', 'cats', 'pugs']}/>
        <MenuSide id='list_menu' offers={['dogs', 'cats', 'pugs']}/>
        <IconButton classNameA="filter_button" classNameI="fa-filter fa-lg filter-icon" menu="filter_menu"
                    color={{color: 'white'}}/>

        <IconButton classNameA="list_button" classNameI="fa-list fa-lg filter-icon" menu='list_menu' color={{color: 'white'}}/>

        <IconButton classNameI="fa-plus fa-lg filter-icon" classNameA="modal-trigger" href="#form" color={{color: 'white'}}/>
        <AddForm id="form" purpose={this.props.openTab}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openTab: state.openTab,
  }
};

export default connect(
  mapStateToProps
)(FilterButtons);