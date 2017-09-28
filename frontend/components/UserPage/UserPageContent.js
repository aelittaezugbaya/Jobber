/**
 * Created by aelittaezugbaa on 27/09/2017.
 */
import React from 'react';

import FeedbackList from './FeedbackList';
import Stars from './Stars';

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

  componentWillMount(){
    window.fetch(`/api/user/${this.props.id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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

    window.fetch(`/api/feedback/${this.props.id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          feedbacks:data
        })

      })
  }

  getUser(id){

    let  user = { name:'' }
    let fname;

    let prom=window.fetch(`/api/user/${id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{
        this.setState({
          id:data.FullName
        })
      })



  }




  renderFeedbacks(){
    let feedbacks=[]
    for(let feedback of this.state.feedbacks){
      this.getUser(feedback.UserSourceID);
      let id=feedback.UserSourceID
      feedbacks.push(
        <li className="collection-item avatar">
          <img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="circle"/>
          <span className="title">{this.state.id}</span>
          <p><strong>Comment:</strong><br/>{feedback.Comment}
          </p>
            <a href="#!" className="secondary-content">
              {this.renderStars(feedback.Rating)}
            </a>
        </li>
      )
    }
    return feedbacks;
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
              <ul>
                <li><Stars rating={Rating}/></li>
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
          <FeedbackList feedbacks={this.state.feedbacks}/>
        </div>
      </div>
    )

  }
}
