/**
 * Created by aelittaezugbaa on 13/09/2017.
 */
import React from 'react';

export default class Tabs extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="">
                <ul className={`tabs ${this.props.className}`}>
                    <li className="tab"><a href="#test1">Test 1</a></li>
                    <li className="tab"><a className="active" href="#test2">Test 2</a></li>
                </ul>

            </div>
        )
    }
}