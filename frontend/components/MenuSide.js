/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';
import InputRange from 'react-input-range';
import Button from './Button'


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

    componentDidMount(){
        $(document).ready(function(){

            $('.modal').modal();
        });
    }






    renderLoginWindow(){
        let content=[];
        content.push(
            <form>
                <h4 className="center">Log in</h4>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="user_name" type="text" className="validate"/>
                        <label htmlFor="user_name">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">lock</i>
                        <input id="password" type="text" className="validate"/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="center">
                    <Button className="btn waves-effect waves-light grey lighten-4 black-text" name="action">Cancel</Button>
                    <Button className="btn waves-effect waves-light amber darken-1" type="submit" name="action">Log In</Button>

                </div>
                <p className="center">If you don't have an account,<br/> please <a className=" modal-trigger" href="#registration">register</a></p>
            </form>

        )
        return content;
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
                        <p>
                            <input type="checkbox" className="filled-in" id="pet_care" />
                            <label htmlFor="pet_care">Pet Care</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="house_repair" />
                            <label htmlFor="house_repair">House repair</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="children_care" />
                            <label htmlFor="children_care">Children care</label>
                        </p>
                    </div>
                    <div className="right checkRight">
                        <p>
                            <input type="checkbox" className="filled-in" id="beauty" />
                            <label htmlFor="beauty">Beauty</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="cleaning" />
                            <label htmlFor="cleaning">Cleaning</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="other" />
                            <label htmlFor="other">Other</label>
                        </p>
                    </div>
                </li>
                <li style={filterLiStyle.gender}><a>Gender</a><hr/>
                    <p className="checkLeft left">
                        <input type="checkbox" className="filled-in " id="male" />
                        <label htmlFor="male">Male</label>
                    </p>
                    <p className="checkRight right">
                        <input type="checkbox" className="filled-in " id="female" />
                        <label htmlFor="female">Female</label>
                    </p>
                </li>
                <li style={filterLiStyle.raiting}><a>Raiting</a><hr/>
                    <div className="left checkLeft">
                        <p>
                            <input type="checkbox" className="filled-in" id="five" />
                            <label htmlFor="five">5</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="four" />
                            <label htmlFor="four">4</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="three" />
                            <label htmlFor="three">3</label>
                        </p>
                    </div>
                    <div className="right checkRight">
                        <p>
                            <input type="checkbox" className="filled-in" id="two" />
                            <label htmlFor="two">2</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="one" />
                            <label htmlFor="one">1</label>
                        </p>
                        <p>
                            <input type="checkbox" className="filled-in" id="none" />
                            <label htmlFor="none">None</label>
                        </p>
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
        else if(this.props.id=='filter_menu'){
            content=this.renderFilters();
        }
        else if(this.props.id=='log_in'){
            content=this.renderLoginWindow()
        }

        return(<ul id={this.props.id} className={`side-nav ${this.props.id==='filter_menu' ?'right-aligned':''}`}>{
                content
            }</ul>
        )
    }
}
