/**
 * Created by aelittaezugbaa on 13/09/2017.
 */
import React from 'react';

export default class Tabs extends React.Component{
    constructor(props){
        super(props)
    }
    renderTabs(){
        let tabs=[];
        for(let tab of this.props.tabs){
            tabs.push(
                <li className="tab"><a href="#test1">{tab}</a></li>
            )
        }
        return tabs;
    }
    render(){
        return(
            <ul className={`tabs ${this.props.className}`}>
                {this.renderTabs()}
            </ul>
        )
    }
}