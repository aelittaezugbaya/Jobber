/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';
import InputRange from 'react-input-range';
import Checkbox from "./Checkbox";

const filterLiStyle={
    category: {height: '190px'},
    gender:{height: '115px'},
    raiting:{height: '190px'}
};

const RangeStyle={

}

export default class MenuSide extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            value: { min: 0, max: 50 },
        };
    }

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
            <li className="log_out"><a className="waves-effect" href="#!">Log out</a><div className="divider"></div></li>

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
            <form action="#">
                <li style={filterLiStyle.category}><a>Category</a><hr/>
                    <div className="left checkLeft">
                        <Checkbox id="pet_care" text="Pet care"/>
                        <Checkbox id="house_repair" text="House repair"/>
                        <Checkbox id="children_care" text="Children care"/>
                    </div>
                    <div className="right checkRight">
                        <Checkbox id="beauty" text="Beauty"/>
                        <Checkbox id="cleaning" text="Cleaning"/>
                        <Checkbox id="other" text="Other"/>
                    </div>
                </li>
                <li style={filterLiStyle.gender}><a>Gender</a><hr/>
                    <Checkbox id="male" text="Male" className="checkLeft left"/>
                    <Checkbox id="female" text="Female" className="checkRight right"/>
                </li>
                <li style={filterLiStyle.raiting}><a>Raiting</a><hr/>
                    <div className="left checkLeft">
                        <Checkbox id="five" text="5"/>
                        <Checkbox id="four" text="4"/>
                        <Checkbox id="three" text="3"/>
                    </div>
                    <div className="right checkRight">
                        <Checkbox id="two" text="2"/>
                        <Checkbox id="one" text="1"/>
                        <Checkbox id="none" text="none"/>
                    </div>
                </li>
                <li><a>Price Range</a><hr/>
                    <InputRange
                        formatLabel={value => `${value}€`}
                        name={'Till'}
                        maxValue={50}
                        minValue={0}
                        value={this.state.value}
                        onChange={value => this.setState({ value })} />
                </li>
            </form>
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
