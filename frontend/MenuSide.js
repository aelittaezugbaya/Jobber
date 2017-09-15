/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';

export default class MenuSide extends React.Component{
    renderMainMenu(){
        let content=[];
        content.push(<div>
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
        </div>)
        return content;
    }

    renderList(){
        let list=[];
        for(let offer of this.props.offers){
            list.push(
                <div>
                    <li><a className="waves-effect" href="#!"><span>3,5  <i className="fa fa-star"> </i> </span>{offer} <span className="right">4,5$/hour</span></a></li>
                    <li><div className="divider"></div></li>
                </div>
            )
        }

        return list;
    }

    renderFilters(){
        let filters=[]
        filters.push(
            <div>
                <li><a>Category</a></li><hr/>
                <div className="categories">

                </div>
            </div>
        )
        return filters;
    }

    render(){
        let content=null;
        if(this.props.id==="main_menu"){
            content=this.renderMainMenu()
        }else if(this.props.id==="list_menu"){
            content=this.renderList()
        }
        else{
            content=this.renderFilters();
        }
        return(<ul id={this.props.id} className={`side-nav ${this.props.id==='filter_menu' ?'right-aligned':''}`}>{
                content
            }</ul>
        )
    }
}
