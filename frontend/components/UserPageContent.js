/**
 * Created by aelittaezugbaa on 27/09/2017.
 */
import React from 'react';

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
        this.setState({
          user:{id:this.props.id,
              fullName: data.FullName,
              email: data.Email,
              dateOfBirth: data.DateOfBirth.split('T')[0],
              gender: data.Gender,
              rating:data.Rating},
              description: data.Description
        })
      })

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



  renderStars(rating){
    const stars=[];

    for(let i = 0; i<rating; i++){
      stars.push(<i className="material-icons">star</i>)
    }
    const rest=5-rating;

    for(let n = 0; n<rest; n++){
      stars.push(<i className="material-icons">star_border</i>)
    }
    return stars;
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
    return (
      <div className="row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img
                src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYtAAAAJGY0MDE1YWVhLTA4NWYtNGE2MS04Mzc3LWVjNmU1MzFiNjhkMg.jpg"/>
              <span className="card-title">{this.state.user.fullName}</span>
            </div>
            <div className="card-content">
              <ul>
                <li>{this.renderStars(this.state.user.rating)}</li>
                <li><strong>Email: </strong>{this.state.user.email}</li>
                <li><strong>Date Of Birth: </strong>{this.state.user.dateOfBirth}</li>
                <li><strong>Gender: </strong>{this.state.user.gender}</li>
                <li><strong>Additional information:</strong> {this.state.user.description}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col s12 m8">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Feedback</span>
              <ul className="collection">
                {this.renderFeedbacks()}
                <li className="collection-item avatar">
                  <img
                    src="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg"
                    alt="" className="circle"/>
                  <span className="title">User Name 1</span>
                  <p><strong>Comment:</strong><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ornare quam. Cras aliquet magna
                    et ornare dapibus. Nam fermentum elit a tortor suscipit, eget molestie risus mollis. </p>
                  <a href="#!" className="secondary-content"><i className="material-icons">star</i><i
                    className="material-icons">star</i><i className="material-icons">star</i><i
                    className="material-icons">star</i></a>
                </li>
                <li className="collection-item avatar">
                  <img src="https://media.cackle.me/7/28/c79b935831fa311bf83174b159103287.jpg" alt=""
                       className="circle"/>
                  <span className="title">User Name 2</span>
                  <p><strong>Comment:</strong><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ornare quam. Cras aliquet magna
                    et ornare dapibus. Nam fermentum elit a tortor suscipit, eget molestie risus mollis. </p>
                  <a href="#!" className="secondary-content"><i className="material-icons">star</i><i
                    className="material-icons">star</i><i className="material-icons">star</i><i
                    className="material-icons">star</i></a>
                </li>
                <li className="collection-item avatar">
                  <img
                    src="http://rs600.pbsrc.com/albums/tt82/roadstar166/1-SquidooImages/Tired-Profile-Picture-Cartoon-Portrait-Avatars-are-Hot-SoyCandleMaker-Lover-Simpson.png~c200"
                    alt="" className="circle"/>
                  <span className="title">Leave your feedback</span>
                  <form>
                    <div className="input-field col s12">
                      <input id="comment" type="text" className="validate "/>
                      <label htmlFor="comment">Comment</label>
                    </div>
                    <div className="row right">
                      <button className="btn-flat " type="reset" href="#">Cancel</button>
                      <button className="btn-flat amber white-text" type="submit" href="#">Submit</button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )

  }
}
