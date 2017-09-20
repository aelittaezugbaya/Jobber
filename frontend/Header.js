import React from 'react';
import Tabs from './Tabs';
import Input from './Input';
import MenuSide from './MenuSide';
import IconButton from './IconButton';
import Loggo from './Logo';
import AddForm from './AddForm'
import RegistrationModal from './RegistrationModal';

export default class Header extends React.Component{
    componentDidMount(){
        $(document).ready(function(){
            $('.main_menu_button').sideNav({
                edge: 'left',
                draggable: true,
            });
            $('.list_button').sideNav({
                edge: 'right',
                draggable: true,
            });
            $('.filter_button').sideNav({
                edge: 'right',
                draggable: true,
            });
            $('.modal').modal();

        });
    }
    render(){
        return(
            <div className="header-container ">
                <div className="navbar nav-wrapper header">
                    <div className="header__menu-button">
                        <RegistrationModal/>
                        <MenuSide id="log_in"/>
                        <IconButton classNameA="navbar-brand button-collapse main_menu_button show-on-large" menu='log_in' classNameI="fa-bars fa-lg" onClick={this.onClickMenu} />
                        <div className="header__tabs">
                            <Tabs className="tabs-style tabs-fixed-width" tabs={['Buying','Selling']}/>
                        </div>
                    </div>
                    <div className="header__search">
                        <Input className="header__search__input"/>
                    </div>
                    <div className="header__action-buttons">
                        <MenuSide id='filter_menu' offers={['dogs','cats','pugs']}/>
                        <MenuSide id='list_menu' offers={['dogs','cats','pugs']}/>
                        <IconButton classNameA="filter_button" classNameI="fa-filter fa-lg" menu="filter_menu" color={{color:'white'}}/>

                        <IconButton classNameA="list_button" classNameI="fa-list fa-lg" menu='list_menu' color={{color:'white'}}/>

                        <IconButton classNameI="fa-plus fa-lg" classNameA="modal-trigger" href="#form" color={{color:'white'}}/>
                        <AddForm id="form" purpose="Buying"/>
                    </div>


                    <div  className="header__logo">
                        <Loggo name="Jobber"/>
                    </div>

                </div>
            </div>
        )
    }
}