/**
 * Created by aelittaezugbaa on 27/09/2017.
 */
import React from 'react';

import FeedbackList from './FeedbackList';
import Stars from './Stars';
import EditModal from './EditModal'
import fetch from 'utils/fetch';

export default class UserPageContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedbacks:[],
      user:{
        id: null,
        fullName:null,
        email:null,
        dateOfBirth:null,
        gender:null,
        rating: null
      }

    }
  }

  componentDidMount(){
    $('.modal').modal({
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%'
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should')
  //   return !(JSON.stringify(nextState) === JSON.stringify(this.state));
  // }

  componentWillMount(){
    this.fetchUserData();
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.fetchUserData();

  }

  fetchUserData() {
    fetch(`/api/user/${this.props.id}`,
      {
        headers: {
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{
        const {
          FullName,
          Email,
          DateOfBirth,
          Gender,
          Rating,
          Description,
          _id
        } = data;

        this.setState({
          user: {
            _id,
            FullName,
            Email,
            DateOfBirth: new Date(DateOfBirth),
            Gender,
            Rating,
            Description
          }
        })
      });
  }

  render() {
    const {
      _id,
      FullName,
      Email,
      DateOfBirth,
      Gender,
      Rating,
      Description
    } = this.state.user;
    return (
      <div className="row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img
                src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYtAAAAJGY0MDE1YWVhLTA4NWYtNGE2MS04Mzc3LWVjNmU1MzFiNjhkMg.jpg"/>
              <span className="card-title">{FullName}</span>
            </div>
            <div className="card-content">
              <EditModal user = {this.state.user}/>
              <ul>
                <li>
                  <a href="#editModal" className="secondary-content modal-trigger"><i className="material-icons">create</i></a>
                  <Stars rating={Rating}/>
                </li>
                <li><strong>Email: </strong>{Email}</li>
                <li><strong>Date Of Birth: </strong>{DateOfBirth? DateOfBirth.toDateString() : null}</li>
                <li><strong>Gender: </strong>{Gender}</li>
                <li><strong>Additional information:</strong> {Description}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col s12 m8">
          <FeedbackList id={_id} onFeedbackSubmit={() => this.fetchUserData()}/>
        </div>
      </div>
    )

  }
}
