import React from 'react';
import Tabs from './Tabs';
import Input from './Input';
import MenuSide from './MenuSide';
import IconButton from './IconButton';
import Loggo from './Logo';


export default class Header extends React.Component{
    componentDidMount(){
        $(document).ready(function(){
            $('.button-collapse').sideNav({

            });
        });
    }
    render(){
        return(
            <div className="header-container ">
                <div className="navbar nav-wrapper header">
                    <div className="header__menu-button">
                        <MenuSide/>
                        <IconButton classNameA="navbar-brand button-collapse" classNameI="fa-bars fa-lg" onClick={this.onClickMenu} />
                        <div className="header__tabs">
                            <Tabs className="tabs-style tabs-fixed-width"/>
                        </div>
                    </div>
                    <div className="header__search">
                        <Input className="header__search__input"/>
                    </div>
                    <div className="header__action-buttons">
                        <IconButton classNameI="fa-filter fa-lg" color={{color:'white'}}/>
                        <IconButton classNameI="fa-list fa-lg" color={{color:'white'}}/>
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