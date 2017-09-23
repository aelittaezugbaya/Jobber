import React from 'react';

export default class Input extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={`text-field ${this.props.className} `}>

                <input placeholder="Search" id="search" type="text" className="validate"/>

            </div>
        )
    }
}