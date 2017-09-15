import React from 'react';
import Tabs from './Tabs';
import Input from './Input';
import MenuSide from './MenuSide';
import IconButton from './IconButton';
import Loggo from './Logo';


export default class Header extends React.Component{
    componentDidMount(){
        $(document).ready(function(){
            $('.main_menu_button').sideNav({
                edge: 'left',
            });
            $('.list_button').sideNav({
                edge: 'right',
            });
            $('.filter_button').sideNav({
                edge: 'right',
            });
        });
    }
    render(){
        return(
            <div className="header-container ">
                <div className="navbar nav-wrapper header">
                    <div className="header__menu-button">
                        <MenuSide id="main_menu"/>
                        <IconButton classNameA="navbar-brand button-collapse main_menu_button show-on-large" menu='main_menu' classNameI="fa-bars fa-lg" onClick={this.onClickMenu} />
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
                        <IconButton classNameI="fa-plus fa-lg" color={{color:'white'}}/>
                    </div>

                    <div  className="header__logo">
                        <Loggo name="Jobber"/>
                    </div>

                </div>
            </div>
        )
    }
}