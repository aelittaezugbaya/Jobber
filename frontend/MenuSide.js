/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';

export default class MenuSide extends React.Component{

    render(){
        return(
            <ul id="slide-out" className="side-nav">
                <li><div className="user-view">
                    <div className="background">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi3X9F-vgjgBXtiWKmf_c7vJQH49-vkEvwSK_fH1OcvGaDORWs"/>
                    </div>
                    <a href="#!user"><img className="circle" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYtAAAAJGY0MDE1YWVhLTA4NWYtNGE2MS04Mzc3LWVjNmU1MzFiNjhkMg.jpg"/></a>
                    <a href="#!name"><span className="white-text name">John Doe</span></a>
                    <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
                </div></li>
                <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
        )
    }
}