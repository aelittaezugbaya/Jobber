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
                <div className="navbar nav-wrapper header ">
                    <div className="row">
                        <div className="col s1">
                            <MenuSide/>
                            <IconButton classNameA="navbar-brand button-collapse" classNameI="fa-bars fa-lg" onClick={this.onClickMenu} />
                        </div>
                        <Tabs className="tabs-style col s3"/>
                        <Input className="col s3 push-s1"/>
                        <div  className="col s3 push-s4">
                            <Loggo name="Jobber"/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}