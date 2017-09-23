/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';

export default class Loggo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <a href="#" className="logo">{this.props.name}</a>
        )
    }
}