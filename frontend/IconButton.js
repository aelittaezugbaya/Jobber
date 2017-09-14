/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React, { Component } from 'react';

export default class IconButton extends React.Component{
    constructor(props){
        super(props);

    }


    render(){
        return(
            <a className={`${this.props.classNameA}`} onClick={this.onClick} href="#">
                <i className ={`fa ${this.props.classNameI}`} aria-hidden="true"></i>
            </a>
        )
    }
}