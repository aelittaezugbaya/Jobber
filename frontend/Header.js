import React from 'react';

export default class Header extends React.Component{
    render(){
        return(
            <div className="container-fluid header-container">
                <div className="navbar navbar-default header">
                    <div className="container-fluid">
                        <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        )
    }
}