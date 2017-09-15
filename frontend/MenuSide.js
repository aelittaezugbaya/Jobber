/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';

export default class MenuSide extends React.Component{

    render(){
        return(
            <ul id={this.props.id} className={`side-nav ${this.props.id==='filter_menu' ?'right-aligned':''}`}>
                <li><div className="user-view">
                    <div className="background">
                        <img src="http://thewallpaper.co/wp-content/uploads/2016/03/colorful-triangles-background-high-resolution-images-free-stock-photos-samsung-wallpaper-desktop-images-for-mac-windows-wallpaper-amazing-hd-digital-5000x3750-300x200.jpg"/>
                    </div>
                    <a href="#!user"><img className="circle" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYtAAAAJGY0MDE1YWVhLTA4NWYtNGE2MS04Mzc3LWVjNmU1MzFiNjhkMg.jpg"/></a>
                    <a href="#!name"><span className="white-text name">John Doe</span></a>
                    <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
                </div></li>

                <li><a className="waves-effect" href="#!">Add new offer</a></li>
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="#!">Add new request</a></li>
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="#!">Saved Request/Offers</a></li>
                <li><div className="divider"></div></li>
            </ul>
        )
    }
}