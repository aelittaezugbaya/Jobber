import React from 'react';
import Header from './Header'
import Actions from '../common/actions';
import jwt_decode from 'jwt-decode';
import {connect } from 'react-redux';


class MainView extends React.Component{
    componentWillMount(){
        if(window.localStorage.accessToken !== undefined) {
            console.log(window.localStorage.accessToken)
            this.props.initUser(window.localStorage.accessToken)
        }
    }

    render() {
        return (
            <Header/>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        initUser: (token) => {
            let user = jwt_decode(token);
            dispatch(Actions.addCurrentUser(user));
        }
    }
};

// const mapStateToProps = (state) => {
//     return {
//
//     }
// };


export default connect(
    null,
    mapDispatchToProps
)(MainView);