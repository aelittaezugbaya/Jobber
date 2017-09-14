import React from 'react';
import Tabs from './Tabs';
import Input from './Input';
import MenuSide from './MenuSide';
import IconButton from './IconButton'


export default class Header extends React.Component{
    onClickMenu(ev){

    }
    render(){
        return(
            <div className="header-container ">
                <div className="navbar nav-wrapper header ">
                    <div className="row">
                        <div className="col s1">
                            <IconButton classNameA="navbar-brand button-collapse" classNameI="fa-bars fa-lg" />
                        </div>
                        <Tabs className="tabs-style col s3"/>
                        <Input className="col s4 push-s1"/>
                    </div>

                </div>

            </div>
        )
    }
}