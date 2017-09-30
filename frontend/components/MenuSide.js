/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';
import InputRange from 'react-input-range';

import Button from './Button'
import jwt_decode from 'jwt-decode';
import Actions from '../common/actions';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';
import InputLogin from './InputLogin';

const filterLiStyle={
    category: {height: '190px'},
    gender:{height: '115px'},
    raiting:{height: '190px'}
};

const RangeStyle={

}

class MenuSide extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            value: { min: 0, max: 50 },
            user: null
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        $(document).ready(function(){

            $('.modal').modal();
        });
    }

    loginAPI(email,password){
        let data = 'Email=' + encodeURIComponent(email) +
            '&Password=' + encodeURIComponent(password);
        window.fetch('/api/auth/login',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(data => data.text())
            .then(data => {
                // let base64Url = data.split('.')[1];
                // let base64 = base64Url.replace('-', '+').replace('_', '/');
                // console.log(JSON.parse(window.atob(base64)))
                const user = jwt_decode(data);
                console.log(user.FullName);
                window.localStorage.accessToken = data;
                this.props.onSuccessfulLogin(user);
            })
            .catch(err => console.log(err));

    }

    logout(){
        delete window.localStorage.accessToken;
        this.props.onLogout();
    }
;


    renderLoginWindow(){
        let content=[];
        content.push(
            <form>
                <h4 className="center">Log in</h4>
                <div className="row">
                    <InputLogin id="user_name" type="text" text="Username" />
                </div>
                <div className="row">
                    <InputLogin id="password" type="password" text="Password" />
                </div>
                <div className="center">
                    <Button className="btn waves-effect waves-light grey lighten-4 black-text" type="reset" name="action">Cancel</Button>
                    <Button className="btn waves-effect waves-light amber darken-1" type="button" onClick={() => this.loginAPI(document.getElementById('user_name').value, document.getElementById('password').value)} name="action">Log In</Button>

                </div>
                <p className="center">If you don"\'"t have an account,<br/> please <a className=" modal-trigger" href="#registration">register</a></p>
            </form>

        )
        return content;
    }

    renderMainMenu(){
        let content=[];
        content.push(<div>
            <li><div className="user-view">
                <div className="background">
                    <img src="../img/background.jpg"/>
                </div>
                <a href="#!user"><img className="circle" src="../img/avatar.jpg"/></a>
                <a href="#!name"><span className="white-text name">{this.props.name}</span></a>
                <a href="#!email"><span className="white-text email">{this.props.email}</span></a>
            </div></li>

            <li><a className="waves-effect" href="#!">Add new offer</a></li>
            <li><div className="divider"></div></li>
            <li><a className="waves-effect" href="#!">Add new request</a></li>
            <li><div className="divider"></div></li>
            <li><a className="waves-effect" href="#!">Saved Request/Offers</a></li>
            <li><div className="divider"></div></li>
            <li className="log_out"><a className="waves-effect" onClick={this.logout} href="#!">Log out</a><div className="divider"></div></li>

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

const mapDispatchToProps = (dispatch) => {
    return {
        onSuccessfulLogin: (user) => {
            dispatch(Actions.addCurrentUser(user));
        },
        onLogout: () => {
            dispatch(Actions.logout())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuSide);
